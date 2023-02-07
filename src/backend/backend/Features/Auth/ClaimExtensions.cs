using System.Security.Claims;

namespace backend.Features.Auth;

public static class ClaimExtensions
{
    public static string GetUserId(this IHttpContextAccessor contextAccessor)
        => contextAccessor.HttpContext.User.Claims.Single(e => e.Type == ClaimTypes.NameIdentifier).Value;
    public static string GetUsername(this IHttpContextAccessor contextAccessor)
        => contextAccessor.HttpContext.User.Claims.Single(e => e.Type == ClaimTypes.Name).Value;
    public static string GetUsername2(this IHttpContextAccessor contextAccessor)
        => contextAccessor.HttpContext.User.Claims.Single(e => e.Type == ClaimTypes.GivenName).Value;
}