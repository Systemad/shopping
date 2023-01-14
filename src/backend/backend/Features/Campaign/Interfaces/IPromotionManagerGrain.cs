using backend.Features.Campaign.Models;

namespace backend.Features.Campaign.Interfaces;

public interface IPromotionManagerGrain : IGrainWithStringKey
{
    Task AddOrUpdatePromotion(PromotionState promotion);
    Task<PromotionState> GetPromotion(string id);
    Task<List<PromotionState>> GetAllPromotions(string id);
}