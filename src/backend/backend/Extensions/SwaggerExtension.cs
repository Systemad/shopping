using NSwag;
using NSwag.Generation.Processors.Security;

namespace backend.Extensions;

public static class SwaggerExtension
{
    public static void AddSwaggerDocuments(this IServiceCollection serviceCollection, IConfiguration configuration)
    {
        serviceCollection.AddSwaggerDocument(config =>
        {
            config.DocumentName = "v1";
            config.PostProcess = document =>
            {
                document.Info.Version = "v1";
                document.Info.Title = "Shopping APi";
                document.Info.Description = "Web API for Shopping";
                //document.Info.TermsOfService = "None";
                document.Info.Contact = new OpenApiContact
                {
                    Name = "systemad",
                    Email = string.Empty,
                    Url = "https://github.com/Systemad/"
                };
            };
            // Redux code generation does not work with this, find a way to exclude this when generating spec
            /*
            config.AddSecurity("bearer", Enumerable.Empty<string>(), new OpenApiSecurityScheme
            {
                Type = OpenApiSecuritySchemeType.OAuth2,
                Name = "Authorization",
                //In = OpenApiSecurityApiKeyLocation.Header,
                Description = "Type into the text box: Bearer {your JWT token}.",
                Scheme = "Bearer",
                Flow = OpenApiOAuth2Flow.Implicit,
                Flows = new OpenApiOAuthFlows
                {
                    Implicit = new OpenApiOAuthFlow
                    {
                        AuthorizationUrl = configuration["Swagger:AuthorizationUrl"],
                        TokenUrl = configuration["Swagger:TokenUrl"],
                        Scopes = new Dictionary<string, string>
                        {
                            {
                                configuration["Swagger:Scope"],
                                "Access the api as the signed-in user"
                            }
                        }
                    }
                }
            });
            config.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("bearer"));
            */
        });
    }
}