using backend.Features.Product.Models;

namespace backend.Features.Wishlist;

public interface IWishlistGrain : IGrainWithStringKey
{
    Task ChangePublicStatus(bool status);
    Task AddProductToWishlist(string productId);
    Task RemoveProductToWishlist(string productId);
    Task<(bool IsPublic, string Name, List<ProductDetail> products)> GetWishlist();
}