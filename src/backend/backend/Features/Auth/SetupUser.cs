using System.Security.Claims;
using backend.Features.User;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

namespace backend.Features.Auth;

public class SetupUser
{
    private readonly IGrainFactory _factory;
    
    public SetupUser(IGrainFactory factory)
    {
        _factory = factory;
    }
    
    public async Task OnUserInformationReceived(UserInformationReceivedContext context)
    {
        var userId = context.HttpContext.User.Claims.Single(e => e.Type == ClaimTypes.NameIdentifier).Value;
        var name =  context.HttpContext.User.Claims.Single(e => e.Type == ClaimTypes.Name).Value;
        var email = context.HttpContext.User.Claims.Single(e => e.Type == ClaimTypes.GivenName).Value;
        //var orleansService = app.Services.GetRequiredService<IGrainFactory>();
        //var userGrain = orleansService.GetGrain<IUserGrain>(userId);
        var userGrain = _factory.GetGrain<IUserGrain>(userId);
        await userGrain.SetUserInfo(name, email);
        await Task.CompletedTask.ConfigureAwait(false);
    }
}