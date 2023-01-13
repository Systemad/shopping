using backend.Features.Campaign.Models;
using backend.Features.ShoppingCart;
using backend.Features.ShoppingCart.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Features.Campaign;

/// <summary>
/// API Controller for shopping cart
/// </summary>
[ApiController]
[Route("campaign")]
public class CampaignController : ControllerBase
{
    /// <summary>
    /// 
    /// </summary>
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IGrainFactory _grainFactory;
    
    public CampaignController(IGrainFactory grainFactory, IHttpContextAccessor httpContextAccessor)
    {
        _grainFactory = grainFactory;
        _httpContextAccessor = httpContextAccessor;
    }
    
    // TODO: When generating campaign, storeIds somehow to retrivethem them, or greate global campaigngrain?
    [AllowAnonymous]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<CampaignSate>))]
    public async Task<ActionResult> GetActiveCampaigns()
    {
  
        return Ok();
    }
    
    [HttpPost("add/{name:string}/")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<CampaignSate>))]
    public async Task<ActionResult> CreateNewCampaign(string name, [FromBody] string description) // TODO: create whole object?
    {
        var newCampaignId = Guid.NewGuid();
        var campaignGrain = _grainFactory.GetGrain<ICampaignGrain>(newCampaignId.ToString());
        await campaignGrain.CreateCampaign(name, description);
        var campaign = await campaignGrain.GetCampaign();
        return Ok(campaign);
    }

    [HttpPost("add/{campaignId}/{productId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> AddItemToCampaign(string campaignId, string productId)
    {
        var campaignGrain = _grainFactory.GetGrain<ICampaignGrain>(campaignId);
        await campaignGrain.AddProduct(productId);
        return Ok();
    }
    
    [HttpPost("remove/{campaignId}/{productId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> RemoveProductFromCampaign(string campaignId, string productId)
    {
        var campaignGrain = _grainFactory.GetGrain<ICampaignGrain>(campaignId);
        await campaignGrain.RemoveProduct(productId);
        return Ok();
    }
    
    [HttpPost("status/{campaignId}/{status:bool}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> SetCampaignStatus(string campaignId, bool status)
    {
        var campaignGrain = _grainFactory.GetGrain<ICampaignGrain>(campaignId);
        await campaignGrain.SetCampaignStatus(status);
        return Ok();
    }
}