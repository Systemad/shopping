using backend.Features.Campaign.Interfaces;
using backend.Features.Campaign.Models;
using Orleans.Runtime;

namespace backend.Features.Campaign;


public class PromotionManagerGrain : Grain, IPromotionManagerGrain
{
    private readonly IPersistentState<PromotionManagerState> _state;
    private readonly Dictionary<string, PromotionState> _cache = new();
    
    public PromotionManagerGrain([PersistentState(stateName: "PromotionManager", "promotionManagerStore")]  IPersistentState<PromotionManagerState> state)
    {
        _state = state;
    }

    public override async Task OnActivateAsync(CancellationToken cancellationToken)
    {
        await SeedCache();
    }

    public async Task AddOrUpdatePromotion(PromotionState promotion)
    {
        _state.State.Promotions.Add(promotion.Id);
        _cache[promotion.Id] = promotion;
        await _state.WriteStateAsync();
    }

    public Task<PromotionState> GetPromotion(string id) => Task.FromResult(_cache[id]);

    public Task<List<PromotionState>> GetAllPromotions() => Task.FromResult(_cache.Values.ToList());
    
    public Task<List<PromotionState>> GetActivePromotions() => Task.FromResult(_cache.Values.Where(p => p.Active).ToList());
    
    public Task<List<PromotionState>> GetNonActivePromotions() => Task.FromResult(_cache.Values.Where(p => !p.Active).ToList());

    private async Task SeedCache()
    {
        if (_state is not { State.Promotions.Count: > 0  })
        {
            return;
        }
        
        await Parallel.ForEachAsync(_state.State.Promotions, async (id, _) =>
        {
            var productGrain = GrainFactory.GetGrain<IPromotionGrain>(id);
            _cache[id] = await productGrain.GetPromotion();
        });
    }
}