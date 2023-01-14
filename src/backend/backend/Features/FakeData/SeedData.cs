using backend.Features.Campaign.Interfaces;
using backend.Features.Campaign.Models;
using backend.Features.FakeData;
using backend.Features.Product;
using backend.Features.Product.Models;
using Orleans.Runtime;

public class SeedData : IStartupTask
{
    private readonly IGrainFactory _grainFactory;

    public SeedData(IGrainFactory grainFactory)
    {
        _grainFactory = grainFactory;
    }

    // very sloppy
    public async Task Execute(CancellationToken cancellationToken)
    {
        var productFaker = new ProductDetail().SetupFakeProductData();
        var productId = new List<string>();
        foreach (var product in productFaker.GenerateLazy(50))
        {
            productId.Add(product.Id);
            var productGrain = _grainFactory.GetGrain<IProductGrain>(product.Id);
            await productGrain.CreateOrUpdateProduct(product);
        }

        var promotion1 = new PromotionCreationDto
        {
            Name = "Winter sale",
            Description = "all new winter sale!",
            BannerImg = string.Empty,
            Active = true
        };
        await CreatePromotion(Guid.NewGuid().ToString(), promotion1, productId.GetRange(1, 10));

    }
    
    private async Task CreatePromotion(string promotionId, PromotionCreationDto promotionCreationDto, List<string> productIds)
    {
        var campaignGrain = _grainFactory.GetGrain<IPromotionGrain>(promotionId);
        await campaignGrain.CreatePromotion(promotionCreationDto);
        
        foreach (var pr in productIds)
        {
            await campaignGrain.AddProduct(pr);
        }
    }
}