using backend.Features.Product;
using backend.Features.Product.Models;
using Orleans.Runtime;

namespace backend.Features.Wishlist;

public class WishlistGrain : Grain, IWishlistGrain
{
    private readonly IPersistentState<WishlistState> _state;

    public WishlistGrain([PersistentState("Wishlist", "wishlistStore")] IPersistentState<WishlistState> state)
    {
        _state = state;
    }

    public async Task ChangePublicStatus(bool status)
    {
        _state.State.IsPublic = status;
        await _state.WriteStateAsync();
    }

    public async Task AddProductToWishlist(string productId)
    {
        _state.State.ProductIds.Add(productId);
        await _state.WriteStateAsync();
    }

    public async Task RemoveProductToWishlist(string productId)
    {
        _state.State.ProductIds.Remove(productId);
        await _state.WriteStateAsync();
    }
    
    // TODO: Call this in usergrain, and in usergrain create new WishlistDTO with this info
    public async Task<(bool IsPublic, string Name, List<ProductDetail> products)> GetWishlist()
    {
        var productList = new List<ProductDetail>();
        foreach (var id in _state.State.ProductIds)
        {
            var productGrain = GrainFactory.GetGrain<IProductGrain>(id);
            productList.Add(await productGrain.GetProductDetails());
        }

        return (_state.State.IsPublic, _state.State.Name, productList);
    }

}