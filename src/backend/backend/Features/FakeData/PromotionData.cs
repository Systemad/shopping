using backend.Features.Campaign.Models;

namespace backend.Features.FakeData;

public static class PromotionData
{
    public static PromotionCreationDto CreatePromotion(string name, string description, string banner)
    {
        var promotion = new PromotionCreationDto
        {
            Name = name,
            Description = description,
            BannerImg = banner,
            Active = true
        };
        return promotion;
    }
}