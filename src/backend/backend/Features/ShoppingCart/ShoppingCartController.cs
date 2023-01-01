using Microsoft.AspNetCore.Mvc;

namespace backend.Features.ShoppingCart;

[ApiController]
[Route("shopping-cart")]
public class ShoppingCartController : ControllerBase
{
    private readonly IGrainFactory _grainFactory;
    // GET
    public ShoppingCartController(IGrainFactory grainFactory)
    {
        _grainFactory = grainFactory;
    }

    public IActionResult Index()
    {
        //return View();
        return Ok();
    }
}