using backend.Features.Promotion.Models;

namespace backend.Features.Promotion.Interfaces;

public interface IPromotionManagerGrain : IGrainWithStringKey
{
    Task AddOrUpdatePromotion(PromotionState promotion);
    Task<PromotionState> GetPromotion(string id);
    Task<List<PromotionState>> GetAllPromotions();
    Task<List<PromotionState>> GetActivePromotions();
    Task<List<PromotionState>> GetNonActivePromotions();
}