using backend.Features.Product.Models;
using Orleans.Runtime;

namespace backend.Features.Product;

public class ProductGrain : Grain, IProductGrain
{

    private IPersistentState<ProductDetail> _productDetail;

    public ProductGrain([PersistentState(stateName: "Product", storageName:"shopping-card")] IPersistentState<ProductDetail> productDetail)
    {
        _productDetail = productDetail;
    }

    public Task<(bool isAvailable, ProductDetail? productDetail)> TakeProduct(int quantity)
    {
        throw new NotImplementedException();
    }

    public Task<ProductDetail> GetProductDetails()
    {
        throw new NotImplementedException();
    }

    public Task CreateOrUpdateProduct(ProductDetail productDetail)
    {
        throw new NotImplementedException();
    }

    public Task<int> GetProductAvailability()
    {
        throw new NotImplementedException();
    }
}