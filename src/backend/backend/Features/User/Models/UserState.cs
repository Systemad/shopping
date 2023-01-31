namespace backend.Features.User.Models;

[GenerateSerializer]
public class UserState
{
    [Id(0)]
    public string UserId { get; set; }
    [Id(1)]
    public string Username { get; set; }
    [Id(2)]
    public string Email { get; set; }
    [Id(3)]
    public string ShoppingCartId { get; set; } = Guid.NewGuid().ToString();
    [Id(4)]
    public string WishlistId { get; set; } = Guid.NewGuid().ToString();
}