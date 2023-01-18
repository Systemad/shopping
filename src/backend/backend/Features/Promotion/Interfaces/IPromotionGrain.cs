using backend.Features.Promotion.Models;

namespace backend.Features.Promotion.Interfaces;

public interface IPromotionGrain : IGrainWithStringKey
{
    Task CreatePromotion(PromotionCreationDto promotionCreationDto);
    Task UpdatePromotion(PromotionState promotionState);
    Task SetPromotionStatus(bool status);
    Task AddProduct(string id);
    Task RemoveProduct(string id);
    Task<PromotionState> GetPromotion();
}