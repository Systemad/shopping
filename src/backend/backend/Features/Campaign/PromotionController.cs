using backend.Features.Campaign.Interfaces;
using backend.Features.Campaign.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Features.Campaign;

/// <summary>
/// API Controller for campaign 
/// </summary>
[ApiController]
[Route("promotion")]
public class PromotionController : ControllerBase
{
    /// <summary>
    /// 
    /// </summary>
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IGrainFactory _grainFactory;
    
    public PromotionController(IGrainFactory grainFactory, IHttpContextAccessor httpContextAccessor)
    {
        _grainFactory = grainFactory;
        _httpContextAccessor = httpContextAccessor;
    }
    
    [AllowAnonymous]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<PromotionState>))]
    public async Task<ActionResult> GetActivePromotions()
    {
  
        return Ok();
    }
    
    [HttpPost("add")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<PromotionState>))]
    public async Task<ActionResult> CreatePromotion([FromBody] PromotionCreationDto promotionCreationDto)
    {
        var newCampaignId = Guid.NewGuid();
        var campaignGrain = _grainFactory.GetGrain<IPromotionGrain>(newCampaignId.ToString());
        await campaignGrain.CreatePromotion(promotionCreationDto);
        var campaign = await campaignGrain.GetPromotion();
        return Ok(campaign);
    }

    [HttpPost("add/{promotionId}/{productId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> AddProductToPromotion(string promotionId, string productId)
    {
        var campaignGrain = _grainFactory.GetGrain<IPromotionGrain>(promotionId);
        await campaignGrain.AddProduct(productId);
        return Ok();
    }
    
    [HttpPost("remove/{promotionId}/{productId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> RemoveProductFromPromotion(string promotionId, string productId)
    {
        var campaignGrain = _grainFactory.GetGrain<IPromotionGrain>(promotionId);
        await campaignGrain.RemoveProduct(productId);
        return Ok();
    }
    
    [HttpPost("status/{promotionId}/{status:bool}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> SetPromotionStatus(string promotionId, bool status)
    {
        var campaignGrain = _grainFactory.GetGrain<IPromotionGrain>(promotionId);
        await campaignGrain.SetPromotionStatus(status);
        return Ok();
    }
}