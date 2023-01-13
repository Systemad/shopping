using backend.Features.Campaign.Models;
using backend.Features.Product.Models;

namespace backend.Features.Campaign;

public interface ICampaignGrain : IGrainWithStringKey
{
    Task CreateCampaign(string name, string description);
    Task SetCampaignStatus(bool status);
    Task AddProduct(string id);
    Task RemoveProduct(string id);
    Task<CampaignSate> GetCampaign();
}