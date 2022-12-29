using backend.Features.Product.Models;

namespace backend.Features.Inventory;

public interface IInventoryGrain : IGrainWithStringKey
{
    Task AddOrUpdateProduct(ProductDetail productDetail);
    Task RemoveProduct(string id);
    Task<HashSet<ProductDetail>> GetAllProducts();
}