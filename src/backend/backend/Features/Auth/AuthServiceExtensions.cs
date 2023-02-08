using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Identity.Web;

namespace backend.Features.Auth;


internal static class AuthServiceExtensions
{
    internal static void AddAzureB2C(this IServiceCollection serviceCollection, IConfiguration configuration)
    {
        serviceCollection.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddMicrosoftIdentityWebApp(options =>
            {
                configuration.GetSection("AzureADB2C");
                options.Events ??= new OpenIdConnectEvents();
            });
        
        /*
        serviceCollection.Configure<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme, options =>
        {
            var existingOnTokenValidatedHandler = options.Events.OnTokenValidated;
            options.Events.OnTokenValidated = async context =>
            {
                await existingOnTokenValidatedHandler(context);
                // Your code to add extra configuration that will be executed after the current event implementation.
                options.TokenValidationParameters.ValidIssuers = new[] { "", "" };
                options.TokenValidationParameters.ValidAudiences = new[] { "", ""};
            };
        });
        */
        /*
        builder.Services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
            .AddMicrosoftIdentityWebApp(builder.Configuration.GetSection("AzureADB2C"));
        
        serviceCollection.AddAuthorization(options =>
        {
            // By default, all incoming requests will be authorized according to 
            // the default policy
            options.FallbackPolicy = options.DefaultPolicy;
        });
        */
    }
}