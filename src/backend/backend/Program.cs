using System.Text.Json.Serialization;
using Asp.Versioning;
using backend.Features.Auth;
using backend.Features.FakeData;
using Orleans.Configuration;

var builder = WebApplication.CreateBuilder(args);

var invariant = "Npgsql";
var connectionString =
    "Host=shortingdb;Port=5432;Database=shorting-db;Username=postgres;Password=Compaq2009";

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

builder.Services.AddAzureB2C(builder.Configuration);

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


builder.Services.AddSwaggerDocument(config =>
{
    config.PostProcess = document =>
    {
        document.Info.Version = "v1";
        document.Info.Title = "Shopping APi";
        document.Info.Description = "Web API for Shopping";
        //document.Info.TermsOfService = "None";
        document.Info.Contact = new NSwag.OpenApiContact
        {
            Name = "systemad",
            Email = string.Empty,
            Url = "https://github.com/Systemad/"
        };
    };
});
// builder.Services.AddOutputCache();
var app = builder.Build();

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