﻿using backend.Features.Campaign.Interfaces;
using backend.Features.Campaign.Models;
using Orleans.Concurrency;
using Orleans.Runtime;

namespace backend.Features.Campaign;

[Reentrant]
public class PromotionGrain : Grain, IPromotionGrain
{
    private readonly IPersistentState<PromotionState> _state;

    public PromotionGrain([PersistentState(stateName: "Promotion", "promotionStore")]  IPersistentState<PromotionState> state)
    {
        _state = state;
    }
    
    private string GrainKey => this.GetPrimaryKeyString();

    public async Task CreatePromotion(PromotionCreationDto promotionCreationDto)
    {
        _state.State.Name = promotionCreationDto.Name;
        _state.State.Id = GrainKey;
        _state.State.Description = promotionCreationDto.Description;
        _state.State.Active = promotionCreationDto.Active;
        _state.State.BannerImg = promotionCreationDto.BannerImg;
        
        await _state.WriteStateAsync();
        await UpdatePromotion();
    }

    public async Task SetPromotionStatus(bool status)
    {
        _state.State.Active = status;
        await _state.WriteStateAsync();
        await UpdatePromotion();
    }

    public async Task AddProduct(string id)
    {
        _state.State.ProductIds.Add(id);
        await _state.WriteStateAsync();
        await UpdatePromotion();
    }

    public async Task RemoveProduct(string id)
    {
        _state.State.ProductIds.Remove(id);
        await _state.WriteStateAsync();
        await UpdatePromotion();
    }

    public Task<PromotionState> GetPromotion()
    {
        if (!_state.State.Active)
            throw new InvalidOperationException("This campaign is not active");
        return Task.FromResult(_state.State);
    }

    private async Task UpdatePromotion()
    {
        var promotionManager = GrainFactory.GetGrain<IPromotionManagerGrain>(string.Empty);
        await promotionManager.AddOrUpdatePromotion(_state.State);   
    }
}