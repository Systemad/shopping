using System.Security.Claims;
using Asp.Versioning;
using backend.Features.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Features.Wishlist;

/// <summary>
/// API Controller for user wishlist
/// </summary>

[ApiController]
[Authorize]
[ApiVersion(1.0)]
[Route("v{version:apiVersion}/wishlist")]
public class WishlistController : ControllerBase
{
    /// <summary>
    /// 
    /// </summary>
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IGrainFactory _grainFactory;
    
    private string GetUserId => new(User.Claims.Single(e => e.Type == ClaimTypes.NameIdentifier).Value);
    
    public WishlistController(IGrainFactory grainFactory, IHttpContextAccessor httpContextAccessor)
    {
        _grainFactory = grainFactory;
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpGet("all")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(WishlistDto))]
    public async Task<ActionResult> GetWishlist()
    {
        var userGrain = _grainFactory.GetGrain<IUserGrain>(GetUserId);
        var wishlist = await userGrain.GetWishlist();
        return Ok(wishlist);
    }
    
    [HttpPost("add/{productId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> AddProductToWishlist(string productId)
    {
        var userGrain = _grainFactory.GetGrain<IUserGrain>(GetUserId);
        var wishlistId = await userGrain.GetWishlistId();
        var wishlistGrain = _grainFactory.GetGrain<IWishlistGrain>(wishlistId);
        await wishlistGrain.AddProductToWishlist(productId);        
        return Ok();
    }
    
    [HttpDelete("remove/{productId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> RemoveProductFromWishlist(string productId)
    {
        var userGrain = _grainFactory.GetGrain<IUserGrain>(GetUserId);
        var wishlistId = await userGrain.GetWishlistId();
        var wishlistGrain = _grainFactory.GetGrain<IWishlistGrain>(wishlistId);
        await wishlistGrain.RemoveProductToWishlist(productId);        
        return Ok();
    }
}