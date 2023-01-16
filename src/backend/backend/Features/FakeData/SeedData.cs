using backend.Features.Campaign.Interfaces;
using backend.Features.Campaign.Models;
using backend.Features.Product;
using backend.Features.Product.Models;
using Orleans.Runtime;

namespace backend.Features.FakeData;

public class SeedData : IStartupTask
{
    private readonly IGrainFactory _grainFactory;

    public SeedData(IGrainFactory grainFactory)
    {
        _grainFactory = grainFactory;
    }
    
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

        var promotion1 = PromotionData.CreatePromotion("Winter sale", "all new winter sale!", string.Empty);
        var promotion2 = PromotionData.CreatePromotion("Random sale", "all new random sale!", string.Empty);
        var promotion3 = PromotionData.CreatePromotion("New year sale", "all new year sale!", string.Empty);
        await CreatePromotion(Guid.NewGuid().ToString(), promotion1, productId.GetRange(1, 10));
        await CreatePromotion(Guid.NewGuid().ToString(), promotion2, productId.GetRange(11, 20));
        await CreatePromotion(Guid.NewGuid().ToString(), promotion3, productId.GetRange(21, 31));
    }
    
    private async Task CreatePromotion(string promotionId, PromotionCreationDto promotionCreationDto, List<string> productIds)
    {
        var promotionGrain = _grainFactory.GetGrain<IPromotionGrain>(promotionId);
        await promotionGrain.CreatePromotion(promotionCreationDto);
        
        foreach (var pr in productIds)
        {
            await promotionGrain.AddProduct(pr);
        }
    }
}