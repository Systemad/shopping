using backend.Features.Product;
using backend.Features.Product.Models;
using Orleans.Concurrency;
using Orleans.Runtime;

namespace backend.Features.Inventory;

[Reentrant]
public class InventoryGrain : Grain, IInventoryGrain
{
    private readonly IPersistentState<HashSet<string>> _state;
    private readonly IPersistentState<string> _categoryImg;
    private readonly Dictionary<string, ProductDetail> _cache = new();

    public InventoryGrain([PersistentState(stateName: "Inventory", "shopping-cart")] IPersistentState<HashSet<string>> state)
    {
        _state = state;
    }

    public override async Task OnActivateAsync(CancellationToken cancellationToken)
    {
        await SeedCache();
    }

    public async Task AddOrUpdateProduct(ProductDetail productDetail)
    {
        _state.State.Add(productDetail.Id);
        _cache[productDetail.Id] = productDetail;
        await _state.WriteStateAsync();
    }

    public async Task RemoveProduct(string id)
    {
        _state.State.Remove(id);
        _cache.Remove(id);

        await _state.WriteStateAsync();
    }

    public Task<HashSet<ProductDetail>> GetAllProducts() => Task.FromResult(_cache.Values.ToHashSet());

    private async Task SeedCache()
    {
        if (_state is not { State.Count: > 0  })
        {
            return;
        }
        
        await Parallel.ForEachAsync(_state.State, async (id, _) =>
        {
            var productGrain = GrainFactory.GetGrain<IProductGrain>(id);
            _cache[id] = await productGrain.GetProductDetails();
        });
    }
}