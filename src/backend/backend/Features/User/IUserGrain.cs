using backend.Features.Wishlist;

namespace backend.Features.User;

public interface IUserGrain : IGrainWithStringKey
{
    Task SetUserInfo(string username, string email);
    Task<WishlistDto> GetWishlist();
    Task<string> GetShoppingCartId();
    Task<string> GetWishlistId();
}