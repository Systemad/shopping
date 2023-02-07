using System.Security.Claims;
using Asp.Versioning;
using backend.Features.ShoppingCart.Models;
using backend.Features.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Features.ShoppingCart;

/// <summary>
/// API Controller for shopping cart
/// </summary>
[ApiController]
[ApiVersion(1.0)]
[Route("v/{version:apiVersion}/cart")]
public class ShoppingCartController : ControllerBase
{
    /// <summary>
    /// 
    /// </summary>
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IGrainFactory _grainFactory;
    
    private string GetUserId => new(User.Claims.Single(e => e.Type == ClaimTypes.NameIdentifier).Value);
    
    public ShoppingCartController(IGrainFactory grainFactory, IHttpContextAccessor httpContextAccessor)
    {
        _grainFactory = grainFactory;
        _httpContextAccessor = httpContextAccessor;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <returns>A list of clients items in shopping cart</returns>
    [AllowAnonymous]
    [HttpGet("all")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<CartItem>))]
    public async Task<ActionResult> GetShoppingCart()
    {
        var cartId = await GetShoppingCardId();
        var cartGrain = _grainFactory.GetGrain<IShoppingCartGrain>(cartId);
        var items = await cartGrain.GetAllItems();
        return Ok(items);
    }
    
    [AllowAnonymous]
    [HttpPost("add/{id}/{quantity:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> AddItemToCart(string id, int quantity)
    {
        var cartId = await GetShoppingCardId();
        var cartGrain = _grainFactory.GetGrain<IShoppingCartGrain>(cartId);
        await cartGrain.AddOrUpdateItem(id, quantity);
        var cart = await cartGrain.GetAllItems();
        return Ok(cart);
    }
    
    [AllowAnonymous]
    [HttpDelete("remove/{id}/{quantity:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> RemoveItemFromCart(string id, int quantity)
    {
        var cartId = await GetShoppingCardId();
        var cartGrain = _grainFactory.GetGrain<IShoppingCartGrain>(cartId);
        await cartGrain.RemoveItem(id, quantity);
        var cart = await cartGrain.GetAllItems();
        return Ok(cart);
    }
    
    [AllowAnonymous]
    [HttpPost("empty")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> EmptyCart()
    {
        var cartId = await GetShoppingCardId();
        var cartGrain = _grainFactory.GetGrain<IShoppingCartGrain>(cartId);
        await cartGrain.EmptyCart();
        return Ok();
    }

    private async ValueTask<string> GetShoppingCardId()
    {
        if (!string.IsNullOrWhiteSpace(GetUserId))
        {
            var userGrain = _grainFactory.GetGrain<IUserGrain>(GetUserId);
            var cartId = await userGrain.GetShoppingCartId();
            return cartId;
        }
        var id =  _httpContextAccessor.SetOrCreateCookieCartId();
        return id;
    }
}