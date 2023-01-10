namespace backend.Features.ShoppingCart;

// TODO: FIX
internal static class HttpContextExtensions
{
    internal static string SetOrCreateCookieCartId(this IHttpContextAccessor httpContextAccessor)
    {
        const string cartKey = "temp_cartId";
        var cookie = httpContextAccessor?.HttpContext?.Request.Cookies[cartKey];
        if (cookie is not null)
            return cookie;
        
        var cookieId = Guid.NewGuid();
        // Add reminder in grain to remove cart
        var options = new CookieOptions
        {
            Expires = DateTime.UtcNow.AddDays(2)
        };
        // // Set expiration of this cookie to yesterday to remove it.
        // Response.Cookies["SetAspNetIdentityCookiesExpiration"].Expires = DateTime.UtcNow.AddDays(-1);
        httpContextAccessor?.HttpContext?.Response.Cookies.Append(cartKey, cookieId.ToString(), options);
        return cookieId.ToString();
    }
}