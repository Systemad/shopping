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
    
    
    [HttpPost("create")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateProduct([FromBody] ProductCreationDto productCreationDto)
    {
        var product = new ProductDetail
        {
            Id = Guid.NewGuid().ToString(),
            Name = productCreationDto.Name,
            Description = productCreationDto.Description,
            Category = productCreationDto.Category,
            Quantity =  productCreationDto.Quantity,
            Price =  productCreationDto.Price,
            ImageUrl =  productCreationDto.ImageUrl,
            CreatedAt = DateTime.UtcNow
        };
        var productGrain = _grainFactory.GetGrain<IProductGrain>(product.Id);
        await productGrain.CreateOrUpdateProduct(product);
        return Ok();
    }
    
    //[Obsolete("WIP")]
    [HttpDelete("delete/{productId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> DeleteProductById(string productId)
    {
        var productGrain = _grainFactory.GetGrain<IProductGrain>(productId);
        await productGrain.RemoveProduct();
        return Ok();
    }
    
    [HttpPut("update")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdateProduct([FromQuery] ProductDetail productDetail)
    {
        var productGrain = _grainFactory.GetGrain<IProductGrain>(productDetail.Id);
        await productGrain.CreateOrUpdateProduct(productDetail);
        return Ok();
    }
}