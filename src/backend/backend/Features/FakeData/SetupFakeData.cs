using backend.Features.Campaign.Models;
using backend.Features.Product.Models;
using Bogus;

namespace backend.Features.FakeData;

public static class SetupFakeData
{
    public static Faker<ProductDetail> SetupFakeProductData(this ProductDetail productDetail)
    {
        var faker = new Faker<ProductDetail>()
            .StrictMode(true)
            .RuleFor(p => p.Id, (f, p) => f.Random.Number(1, 100_000).ToString())
            .RuleFor(p => p.Name, (f, p) => f.Commerce.ProductName())
            .RuleFor(p => p.Description, (f, p) => f.Lorem.Sentence())
            .RuleFor(p => p.Price, (f, p) => decimal.Parse(f.Commerce.Price(max: 200)))
            .RuleFor(p => p.Quantity, (f, p) => f.Random.Number(0, 1_200))
            .RuleFor(p => p.ImageUrl, (f, p) => f.Image.PicsumUrl())
            .RuleFor(p => p.Category, (f, p) => f.PickRandom<ProductCategory>())
            .RuleFor(p => p.CreatedAt, (f, p) => f.Date.Future());
            return faker;
    }
    
    public static Faker<PromotionState> SetupFakeCampaignData(this PromotionState promotionState)
    {
        var faker = new Faker<PromotionState>()
            .StrictMode(true)
            .RuleFor(p => p.Id, (f, p) => f.Random.Number(1, 100_000).ToString())
            .RuleFor(p => p.Name, (f, p) => f.Commerce.ProductName())
            .RuleFor(p => p.Description, (f, p) => f.Lorem.Sentence())
            .RuleFor(p => p.BannerImg, (f, p) => f.Image.PicsumUrl());
      
        return faker;
    }
    
    
    public static bool MatchesFilter(this ProductDetail product, string? filter)
    {
        if (filter is null or { Length: 0 })
        {
            return true;
        }
        
        return product.Name.Contains(filter, StringComparison.OrdinalIgnoreCase)
                   || product.Description.Contains(filter, StringComparison.OrdinalIgnoreCase);

    }
}