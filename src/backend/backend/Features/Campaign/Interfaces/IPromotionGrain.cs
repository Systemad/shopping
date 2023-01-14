using backend.Features.Campaign.Models;

namespace backend.Features.Campaign.Interfaces;

public interface IPromotionGrain : IGrainWithStringKey
{
    Task CreatePromotion(PromotionCreationDto promotionCreationDto);
    Task SetPromotionStatus(bool status);
    Task AddProduct(string id);
    Task RemoveProduct(string id);
    Task<PromotionState> GetPromotion();
}