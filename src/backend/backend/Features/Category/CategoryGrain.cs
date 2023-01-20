using backend.Features.Product;
using backend.Features.Product.Models;
using Orleans.Concurrency;
using Orleans.Runtime;

namespace backend.Features.Category;

[Reentrant]
public class CategoryGrain : Grain, ICategoryGrain
{
    private readonly IPersistentState<CategoryState> _state;
    private readonly Dictionary<string, ProductDetail> _cache = new();

    public CategoryGrain([PersistentState(stateName: "Category", "categoryStore")] IPersistentState<CategoryState> state)
    {
        _state = state;
    }
    
    public override Task OnActivateAsync(CancellationToken cancellationToken) => SeedCache(); // Fix potential seeding issue
    
    
    public async Task AddOrUpdateProduct(ProductDetail productDetail)
    {
        _state.State.ProductIds.Add(productDetail.Id);
        _cache[productDetail.Id] = productDetail;
        //_state.State.ItemsAmount = _cache.Count;
        await _state.WriteStateAsync();
    }

    public async Task RemoveProduct(string id)
    {
        _state.State.ProductIds.Remove(id);
        _cache.Remove(id);
        //_state.State.ItemsAmount = _cache.Count;
        await _state.WriteStateAsync();
    }

    public Task<HashSet<ProductDetail>> GetAllProducts(int limit)
    {
        var products = _cache.Values.Take(limit).ToHashSet();
        return Task.FromResult(products);
    }

    private async Task SeedCache()
    {
        if (_state is not { State.ProductIds.Count: > 0  })
        {
            return;
        }

        var tasks = new List<Task>();

        foreach (var product in _state.State.ProductIds)
        {
            tasks.Add(SeedTask(product));
        }

        await Task.WhenAll(tasks);
    }

    private async Task SeedTask(string id)
    {
        var productGrain = GrainFactory.GetGrain<IProductGrain>(id);
        _cache[id] = await productGrain.GetProductDetails();
    }
}