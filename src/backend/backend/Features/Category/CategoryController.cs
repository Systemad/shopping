using backend.Features.Product.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Features.Category;
// TODO: Add Pagination
/// <summary>
/// API Controller for Inventory grain. An Inventory represents a category, which consists of products
/// </summary>
[ApiController]
[Route("inventory")]
public class InventoryController : ControllerBase
{
    private readonly IGrainFactory _grainFactory;

    public InventoryController(IGrainFactory grainFactory)
    {
        _grainFactory = grainFactory;
    }

    /// <summary>
    /// Get items of a specific category, default is 10
    /// </summary>
    /// <param name="category"></param>
    /// <param name="limit">Enter amount, leave empty if default amount should be retrieved</param>
    /// <returns>List of products</returns>
    [HttpGet("{category}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ProductDetail>))]
    public async Task<ActionResult> GetItemsForCategory(string category, [FromQuery] int limit = 10)
    {
        var inventoryGrain = _grainFactory.GetGrain<ICategoryGrain>(category);
        var products  = await inventoryGrain.GetAllProducts(limit);
        return Ok(products.ToList());
    }
    
    /// <summary>
    /// Get total items of a random category, default is 10
    /// </summary>
    /// <param name="limit">Enter amount, leave empty if default amount should be retrieved</param>
    /// <returns>List of products</returns>
    [HttpGet("random")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ProductDetail>))]
    public async Task<ActionResult> Get([FromQuery] int limit = 10)
    {
        Array values = Enum.GetValues<ProductCategory>();
        var random = new Random();
        var category = (ProductCategory)values.GetValue(random.Next(values.Length));
        var inventoryGrain = _grainFactory.GetGrain<ICategoryGrain>(category.ToString());
        var products = await inventoryGrain.GetAllProducts(limit);
        return Ok(products.ToList());
    }
}