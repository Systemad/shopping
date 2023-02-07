using System.Security.Authentication;
using System.Security.Claims;
using System.Text.Encodings.Web;
using backend.Features.User;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;

namespace backend.Features.Auth;

// TODO: change AuthenticationSchemeOptions ?
public class CustomAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{

    private IGrainFactory _grainFactory; 
    private readonly ILogger<CustomAuthenticationHandler> _logger;
    
    public CustomAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock, IGrainFactory grainFactory) : base(options, logger, encoder, clock)
    {
        _grainFactory = grainFactory;
        _logger = logger.CreateLogger<CustomAuthenticationHandler>();
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        try
        {
            var userId = Request.HttpContext.User.Claims.Single(e => e.Type == ClaimTypes.NameIdentifier).Value;
            var username = Request.HttpContext.User.Claims.Single(e => e.Type == ClaimTypes.GivenName).Value;
            var email = Request.HttpContext.User.Claims.Single(e => e.Type == ClaimTypes.Email).Value;
            var userGrain = _grainFactory.GetGrain<IUserGrain>(userId);
            await userGrain.SetUserInfo(username, email);
        }
        catch (AuthenticationException e)
        {
            _logger.LogDebug(e, "Error communicating with authenticationhandler");
            throw;
        }

        return AuthenticateResult.NoResult();
    }
}