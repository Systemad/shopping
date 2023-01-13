using backend.Features.Campaign.Models;
using Orleans.Concurrency;
using Orleans.Runtime;

namespace backend.Features.Campaign;

[Reentrant]
public class CampaignGrain : Grain, ICampaignGrain
{
    private readonly IPersistentState<CampaignSate> _state;

    public CampaignGrain([PersistentState(stateName: "Inventory", "campaign")]  IPersistentState<CampaignSate> state)
    {
        _state = state;
    }

    public async Task CreateCampaign(string name, string description)
    {
        _state.State.Name = name;
        _state.State.Description = description;
        await _state.WriteStateAsync();
    }

    public async Task SetCampaignStatus(bool status)
    {
        _state.State.Active = status;
        await _state.WriteStateAsync();
    }

    public async Task AddProduct(string id)
    {
        _state.State.ProductIds.Add(id);
        await _state.WriteStateAsync();
    }

    public async Task RemoveProduct(string id)
    {
        _state.State.ProductIds.Remove(id);
        await _state.WriteStateAsync();
    }

    public Task<CampaignSate> GetCampaign()
    {
        if (!_state.State.Active)
            throw new InvalidOperationException("This campaign is not active");
        return Task.FromResult(_state.State);
    }
}