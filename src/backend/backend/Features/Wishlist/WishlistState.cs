namespace backend.Features.Wishlist;

[GenerateSerializer]
public class WishlistState
{
    [Id(0)]
    public string WishlistId { get; set; }
    [Id(1)]
    public string Name { get; set; }
    [Id(2)]
    public bool IsPublic { get; set; } = false;
    [Id(3)]
    public HashSet<string> ProductIds { get; set; }
}