using NSwag;

namespace backend.Extensions;

public static class AddSwaggerExtension
{
    public static void AddSwaggerDocuments(IServiceCollection serviceCollection)
    {
        serviceCollection.AddSwaggerDocument(config =>
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
            // https://medium.com/@dineshbalani/authenticate-swagger-ui-against-azure-active-directory-in-asp-net-core-web-api-project-f0380dfe69ca
        });
    }
}