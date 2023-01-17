namespace backend.Features.Product.Models;

public class ProductCreationDto
{
    [Id(0)]
    public string Name { get; set; } = null!;
    [Id(1)]
    public string Description { get; set; } = null!;
    [Id(2)]
    public ProductCategory Category { get; set; }
    [Id(3)]
    public int Quantity { get; set; }
    [Id(4)]
    public decimal Price { get; set; }
    [Id(5)]
    public string ImageUrl { get; set; } = null!;
}