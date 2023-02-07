using System.Security.Claims;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Features.User;

[ApiController]
[Authorize]
[ApiVersion(1.0)]
[Route("v/{version:apiVersion}/user")]
public class UserController
{
    private IGrainFactory _grainFactory;
    private IHttpContextAccessor _httpContextAccessor;
    
    public UserController(IGrainFactory grainFactory, IHttpContextAccessor httpContextAccessor)
    {
        _grainFactory = grainFactory;
        _httpContextAccessor = httpContextAccessor;
    }
}