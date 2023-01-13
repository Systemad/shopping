using backend.Features.Campaign;
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
        var campaignId = new List<string>
        {
            Guid.NewGuid().ToString(),
            Guid.NewGuid().ToString(),
            Guid.NewGuid().ToString()
        };
        
        foreach (var product in productFaker.GenerateLazy(50))
        {
            productId.Add(product.Id);
            var productGrain = _grainFactory.GetGrain<IProductGrain>(product.Id);
            await productGrain.CreateOrUpdateProduct(product);
        }
        var campaign1Grain = _grainFactory.GetGrain<ICampaignGrain>(campaignId[0]);
        await campaign1Grain.CreateCampaign("Winter Campaign", "All new winter campaign");
        var campaign1ProductIds = productId.GetRange(1, 10);
        foreach (var pr in campaign1ProductIds)
        {
            await campaign1Grain.AddProduct(pr);
        }
        
        var campaign2Grain = _grainFactory.GetGrain<ICampaignGrain>(campaignId[1]);
        await campaign2Grain.CreateCampaign("New year campaign", "All new year campaign");
        var campaign2ProductIds = productId.GetRange(11, 17);
        foreach (var pr in campaign2ProductIds)
        {
            await campaign2Grain.AddProduct(pr);
        }
        
        var campaign3Grain = _grainFactory.GetGrain<ICampaignGrain>(campaignId[2]);
        await campaign3Grain.CreateCampaign("Back to school Campaign", "All new back to school campaign");
        
        var campaign3ProductIds = productId.GetRange(20, 30);
        foreach (var pr in campaign3ProductIds)
        {
            await campaign3Grain.AddProduct(pr);
        }
    }
}