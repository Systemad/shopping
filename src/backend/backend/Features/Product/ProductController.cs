using backend.Features.Product.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Features.Product;

[ApiController]
[Route("product")]
public class ProductController : ControllerBase
{
    private readonly IGrainFactory _grainFactory;
    
    public ProductController(IGrainFactory grainFactory)
    {
        _grainFactory = grainFactory;
    }

    /// <summary>
    /// Fetch a product by its ID
    /// </summary>
    /// <param name="productId">The ID of the product</param>
    /// <returns>A ProductDetail object</returns>
    [HttpGet("productId")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ProductDetail))]
    public async Task<IActionResult> GetProduct(string productId)
    {
        var productGrain = _grainFactory.GetGrain<IProductGrain>(productId);
        var product = await productGrain.GetProductDetails();
        return Ok(product);
    }
    
    //[Obsolete("WIP")]
    [HttpGet("productIds")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ProductDetail>))]
    public async Task<IActionResult> GetProductsById([FromQuery] string[] productIds)
    {
        var returnProducts = new List<ProductDetail>();
        foreach (var item in productIds)
        {
            var productGrain = _grainFactory.GetGrain<IProductGrain>(item);
            var product = await productGrain.GetProductDetails();
            returnProducts.Add(product);
        }
        return Ok(returnProducts);
    }
    
}