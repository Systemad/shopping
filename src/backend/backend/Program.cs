using System.Security.Claims;
using System.Text.Json.Serialization;
using Asp.Versioning;
using backend.Extensions;
using backend.Features.FakeData;
using backend.Features.User;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Identity.Web;
using Orleans.Configuration;
using Serilog;
using Serilog.Events;

var builder = WebApplication.CreateBuilder(args);

var invariant = "Npgsql";
var connectionString =
    "Host=shortingdb;Port=5432;Database=shorting-db;Username=postgres;Password=Compaq2009";

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Override("System", LogEventLevel.Warning)
    .MinimumLevel.Override("IdentityServer4", LogEventLevel.Information)
    .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
    .MinimumLevel.Override("Microsoft.Hosting.Lifetime", LogEventLevel.Information)
    .MinimumLevel.Override("Microsoft.AspNetCore.DataProtection", LogEventLevel.Debug)
    .MinimumLevel.Override("Microsoft.AspNetCore.Authentication", LogEventLevel.Information)
    .MinimumLevel.Override("Microsoft.AspNetCore.Authorization", LogEventLevel.Information)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .CreateBootstrapLogger();

builder.Host.UseOrleans((ctx, siloBuilder) =>
{
    if (builder.Environment.IsDevelopment())
    {
        siloBuilder.UseLocalhostClustering();
        //siloBuilder.AddMemoryGrainStorageAsDefault();
        siloBuilder.AddMemoryGrainStorage("cartStore");
        siloBuilder.AddMemoryGrainStorage("productStore");
        siloBuilder.AddMemoryGrainStorage("categoryStore");
        siloBuilder.AddMemoryGrainStorage("promotionStore");
        siloBuilder.AddMemoryGrainStorage("promotionManagerStore");
        siloBuilder.AddMemoryGrainStorage("wishlistStore");
        siloBuilder.AddMemoryGrainStorage("userStore");
        //siloBuilder.UseInMemoryReminderService();
        siloBuilder.AddStartupTask<SeedData>();
    }
    else
    {
        siloBuilder.ConfigureEndpoints(11111, 30000);
        siloBuilder.UseAdoNetClustering(options =>
        {
            options.Invariant = invariant;
            options.ConnectionString = connectionString;
        });
        siloBuilder.UseAdoNetReminderService(options =>
        {
            options.Invariant = invariant;
            options.ConnectionString = connectionString;
        });
        siloBuilder.AddAdoNetGrainStorage("shopping-cart", options =>
        {
            options.Invariant = invariant;
            options.ConnectionString = connectionString;
            //options.UseJsonFormat = true;
        });

        siloBuilder.Configure<ClusterOptions>(options =>
        {
            options.ClusterId = "shoppingCluster";
            options.ServiceId = "shoppingService";
        });
    }
});

builder.Host.UseSerilog((context, services, configuration) => configuration
    .ReadFrom.Configuration(context.Configuration)
    .ReadFrom.Services(services)
    .Enrich.FromLogContext()
    .WriteTo.Console());

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApp(options =>
    {
        builder.Configuration.Bind("AzureADB2C", options);
        options.Events ??= new OpenIdConnectEvents();
        options.Events.OnTokenValidated += async context =>
        {
            var orleansService = context.HttpContext.RequestServices.GetRequiredService<IGrainFactory>();
            var userId = context.HttpContext.User.Claims.Single(e => e.Type == ClaimTypes.NameIdentifier).Value;
            var name =  context.HttpContext.User.Claims.Single(e => e.Type == ClaimTypes.Name).Value;
            var email = context.HttpContext.User.Claims.Single(e => e.Type == ClaimTypes.GivenName).Value;
            var userGrain = orleansService.GetGrain<IUserGrain>(userId);
            await userGrain.SetUserInfo(name, email);
            Console.WriteLine($"OnUserInformationReceived {userId} {name}");
            await Task.CompletedTask.ConfigureAwait(false); // ??
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        ops =>
        {
            ops
                .WithOrigins("http://localhost:5173")
                .AllowCredentials()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

builder.Services.AddHttpContextAccessor();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
builder.Services.AddApiVersioning(options =>
{
    options.ApiVersionReader = new UrlSegmentApiVersionReader();
});

builder.Services.AddSwaggerDocuments(builder.Configuration);
// builder.Services.AddOutputCache();
var app = builder.Build();

/*
// Whenever user is properly signed in, setup an orleans grain with the information
// https://stackoverflow.com/questions/51493446/where-the-place-to-put-the-new-userid-into-db-after-user-is-logged-in-with-openi
async Task OnUserInformationReceived(UserInformationReceivedContext context)
{
    var userId = context.HttpContext.User.Claims.Single(e => e.Type == ClaimTypes.NameIdentifier).Value;
    var name =  context.HttpContext.User.Claims.Single(e => e.Type == ClaimTypes.Name).Value;
    var email = context.HttpContext.User.Claims.Single(e => e.Type == ClaimTypes.GivenName).Value;
    var orleansService = app.Services.GetRequiredService<IGrainFactory>();
    var userGrain = orleansService.GetGrain<IUserGrain>(userId);
    await userGrain.SetUserInfo(name, email);
    await Task.CompletedTask.ConfigureAwait(false);
}
*/

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseCors("CorsPolicy");
// app.UseCookiePolicy(); https://learn.microsoft.com/en-us/aspnet/core/security/gdpr?view=aspnetcore-6.0
app.UseOpenApi();
app.UseSwaggerUi3();
app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/", () => "Hello World!");
app.MapControllers();

app.Run();