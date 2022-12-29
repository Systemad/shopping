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
        siloBuilder.AddMemoryGrainStorageAsDefault();
        siloBuilder.AddMemoryGrainStorage("shopping-card");
        siloBuilder.UseInMemoryReminderService();
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
        siloBuilder.AddAdoNetGrainStorage("urls", options =>
        {
            options.Invariant = invariant;
            options.ConnectionString = connectionString;
            //options.UseJsonFormat = true;
        });

        siloBuilder.Configure<ClusterOptions>(options =>
        {
            options.ClusterId = "shortingCluster";
            options.ServiceId = "shortingService";
        });
    }
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseRouting();

app.MapGet("/", () => "Hello World!");

app.Run();