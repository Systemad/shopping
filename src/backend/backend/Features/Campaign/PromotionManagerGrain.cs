using backend.Features.Campaign.Interfaces;
using backend.Features.Campaign.Models;
using Orleans.Concurrency;
using Orleans.Runtime;

namespace backend.Features.Campaign;


public class PromotionManagerGrain : Grain, IPromotionManagerGrain
{
    private readonly IPersistentState<PromotionManagerState> _state;
    private readonly Dictionary<string, PromotionState> _activeCache = new();
    private readonly Dictionary<string, PromotionState> _nonActiveCache = new();

    public PromotionManagerGrain([PersistentState(stateName: "Inventory", "promotionManager")]  IPersistentState<PromotionManagerState> state)
    {
        _state = state;
    }

    public override async Task OnActivateAsync(CancellationToken cancellationToken)
    {
        await SeedCache();
    }

    public async Task AddOrUpdatePromotion(PromotionState promotion)
    {
        _state.State.ActivePromotions.Add(promotion.Id);
        if(promotion.Active)
            _activeCache[promotion.Id] = promotion;
        else
            _nonActiveCache[promotion.Id] = promotion;
            
        await _state.WriteStateAsync();
    }
    
    public async Task<PromotionState> GetPromotion(string id)
    {

        var promotionGrain = GrainFactory.GetGrain<IPromotionGrain>(id);
        var state = await promotionGrain.GetPromotion();
        return state;
    }

    public Task<List<PromotionState>> GetAllPromotions(string id)
    {
        // TODO: for each loop, and get ICampaignGrain, get info, set in list and return
        throw new NotImplementedException();
    }
    
    private async Task SeedCache()
    {
        if (_state is { State.ActivePromotions.Count: > 0  })
        {
            await Parallel.ForEachAsync(_state.State.ActivePromotions, async (id, _) =>
            {
                var productGrain = GrainFactory.GetGrain<IPromotionGrain>(id);
                _activeCache[id] = await productGrain.GetPromotion();
            });
        }

        if (_state is { State.ActivePromotions.Count: > 0 })
        {
            await Parallel.ForEachAsync(_state.State.NonActivePromotions, async (id, _) =>
            {
                var productGrain = GrainFactory.GetGrain<IPromotionGrain>(id);
                _activeCache[id] = await productGrain.GetPromotion();
            });
        }
    }
}