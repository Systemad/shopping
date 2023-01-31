using System.Security.Claims;

namespace backend.Features;

internal static class HttpContextExtensions
{
    internal static string SetOrCreateCookieCartId(this IHttpContextAccessor httpContextAccessor)
    {
        const string cartKey = "temp_cartId";
        var cookie = httpContextAccessor?.HttpContext?.Request.Cookies[cartKey];
        if (cookie is not null)
            return cookie;

        var cookieId = Guid.NewGuid().ToString();
        // Add reminder in grain to remove cart
        var cookieOptions = new CookieOptions
        {
            //Path = "/",
            HttpOnly = false,
            Expires = DateTime.UtcNow.AddDays(2),
            IsEssential = true
        };
        // // Set expiration of this cookie to yesterday to remove it.
        // Response.Cookies["SetAspNetIdentityCookiesExpiration"].Expires = DateTime.UtcNow.AddDays(-1);
        httpContextAccessor?.HttpContext?.Response.Cookies.Append(cartKey, cookieId, cookieOptions);
        return cookieId;
    }

    internal static string TryGetUserId(this IHttpContextAccessor httpContextAccessor) =>
    //{
        httpContextAccessor.HttpContext.User.Claims.Single(e => e.Type == ClaimTypes.NameIdentifier).Value;
        //return userId;
    //}
}