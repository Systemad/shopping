using backend.Features.Product.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Features.Inventory;

[ApiController]
[Route("inventory")]
public class InventoryController : ControllerBase
{
    private readonly IGrainFactory _grainFactory;
    // GET
    public InventoryController(IGrainFactory grainFactory)
    {
        _grainFactory = grainFactory;
    }

    [HttpGet("{category}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ProductDetail>))]
    public async Task<ActionResult> GetItemsForCategory(string category)
    {
        var inventoryGrain = _grainFactory.GetGrain<IInventoryGrain>(category);
        var products = await inventoryGrain.GetAllProducts();
        return Ok(products.ToList());
    }
}