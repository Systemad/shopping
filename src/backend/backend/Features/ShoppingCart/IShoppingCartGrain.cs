using backend.Features.Product.Models;
using backend.Features.ShoppingCart.Models;

namespace backend.Features.ShoppingCart;

public interface IShoppingCartGrain : IGrainWithStringKey
{
    Task<bool> AddOrUpdateItem(int quantity, ProductDetail productDetail);
    Task RemoveItem(string productId, int quantity);
    Task<HashSet<CartItem>> GetAllItems();
    Task<int> GetTotalItems();
    Task EmptyCart();
}