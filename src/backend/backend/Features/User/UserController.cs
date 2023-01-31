using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Features.User;

[ApiController]
[Authorize]
[Route("user")]
public class UserController
{
    private IGrainFactory _grainFactory;
    
    public UserController(IGrainFactory grainFactory)
    {
        _grainFactory = grainFactory;
    }
}