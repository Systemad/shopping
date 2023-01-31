using backend.Features.Product.Models;

namespace backend.Features.Wishlist;

[GenerateSerializer]
public class WishlistDto
{
    [Id(0)]
    public string OwnerId { get; set; }
    [Id(1)]
    public string Owner { get; set; }
    [Id(2)]
    public string WishlistId { get; set; }
    [Id(3)]
    public string Name { get; set; }
    [Id(4)]
    public bool IsPublic { get; set; }
    [Id(5)]
    public IEnumerable<ProductDetail> Products { get; set; }
}