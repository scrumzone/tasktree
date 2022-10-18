using System.Security.Claims;
using System.Security.Principal;
using Microsoft.AspNetCore.Mvc;

namespace TaskTree.Controllers;

// This class will contain any helper methods needed by all controllers
// Any controller created should inherit from this class.
public class TaskTreeControllerBase : ControllerBase
{
    protected bool CurrentUserIdDoesNotMatch(long requestedUserId)
    {
        var userId = long.Parse(((ClaimsIdentity)User.Identity).FindFirst("id").Value);
        return userId != requestedUserId;
    }
}
