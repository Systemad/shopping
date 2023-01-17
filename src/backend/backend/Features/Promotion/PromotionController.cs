using backend.Features.Campaign.Interfaces;
using backend.Features.Campaign.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Features.Campaign;

/// <summary>
/// API Controller for promotion 
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
    
    //[AllowAnonymous]
    [HttpGet("all")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<PromotionState>))]
    public async Task<ActionResult> GetAllPromotions()
    {
        var promotionManager = _grainFactory.GetGrain<IPromotionManagerGrain>(string.Empty);
        var promotions = await promotionManager.GetAllPromotions();
        return Ok(promotions);
    }
    
    [AllowAnonymous]
    [HttpGet("all/active")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<PromotionState>))]
    public async Task<ActionResult> GetActivePromotions()
    {
        var promotionManager = _grainFactory.GetGrain<IPromotionManagerGrain>(string.Empty);
        var promotions = await promotionManager.GetActivePromotions();
        return Ok(promotions);
    }
    
    //[AllowAnonymous]
    [HttpGet("all/inactive")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<PromotionState>))]
    public async Task<ActionResult> GetNonActivePromotions()
    {
        var promotionManager = _grainFactory.GetGrain<IPromotionManagerGrain>(string.Empty);
        var promotions = await promotionManager.GetNonActivePromotions();
        return Ok(promotions);
    }
    
    [HttpPost("add")]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(IEnumerable<PromotionState>))]
    public async Task<ActionResult> CreatePromotion([FromBody] PromotionCreationDto promotionCreationDto)
    {
        var id = Guid.NewGuid();
        var promotionGrain = _grainFactory.GetGrain<IPromotionGrain>(id.ToString());
        await promotionGrain.CreatePromotion(promotionCreationDto);
        var campaign = await promotionGrain.GetPromotion();
        return Ok(campaign);
    }

    [HttpPost("add/{promotionId}/{productId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> AddProductToPromotion(string promotionId, string productId)
    {
        var promotionGrain = _grainFactory.GetGrain<IPromotionGrain>(promotionId);
        await promotionGrain.AddProduct(productId);
        return Ok();
    }
    
    [HttpDelete("remove/{promotionId}/{productId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> RemoveProductFromPromotion(string promotionId, string productId)
    {
        var promotionGrain = _grainFactory.GetGrain<IPromotionGrain>(promotionId);
        await promotionGrain.RemoveProduct(productId);
        return Ok();
    }
    
    [HttpPut("status/{promotionId}/active/{status:bool}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> SetPromotionStatus(string promotionId, bool status)
    {
        var promotionGrain = _grainFactory.GetGrain<IPromotionGrain>(promotionId);
        await promotionGrain.SetPromotionStatus(status);
        return Ok();
    }
}