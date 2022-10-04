using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskTree.Models;
using TaskTree.Models.Requests;
using TaskTree.Models.Responses;

namespace TaskTree.Controllers
{
    [Route("api/[controller]")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    private readonly TaskTreeContext _context;
    private readonly IMapper _mapper;
    private readonly IOptions<AppConfig> _config;

    public UsersController(TaskTreeContext context, IMapper mapper, IOptions<AppConfig> config)
    {
      _context = context;
      _mapper = mapper;
      _config = config;
    }


    // GET: api/users/5
    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<UserResponse>> GetUser(long id)
    {
      if (_context.Users == null)
      {
        return Problem("Entity set 'TaskTreeContext.Users'  is null.", statusCode: 500);
      }
      var user = await _context.Users.FindAsync(id);


      if (user == null)
      {
        return NotFound();
      }

      var userResponse = _mapper.Map<User, UserResponse>(user);

      return userResponse;
    }

    // PUT: api/users/5
    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(long id, UpdateUserRequest updateUserRequest)
    {
      
      if (_context.Users == null)
      {
        return Problem("Entity set 'TaskTreeContext.Users'  is null.", statusCode: 500);
      }
      
      var user = await _context.Users.FindAsync(id);

      if (user == null)
      {
        return NotFound();
      }

      // map using automapper
      _mapper.Map(updateUserRequest, user);

      _context.Entry(user).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!UserExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // POST: api/users
    [HttpPost]
    public async Task<ActionResult<UserResponse>> CreateUser(CreateUserRequest createUserRequest)
    {
      if (_context.Users == null)
      {
        return Problem("Entity set 'TaskTreeContext.Users'  is null.", statusCode: 500);
      }

      var user = _mapper.Map<User>(createUserRequest);

      _context.Users.Add(user);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetUser), new { id = user.Id }, _mapper.Map<User, UserResponse>(user));
    }

    // DELETE: api/Users/5
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(long id)
    {
      if (_context.Users == null)
      {
        return Problem("Entity set 'TaskTreeContext.Users'  is null.", statusCode: 500);
      }
      
      var user = await _context.Users.FindAsync(id);
      if (user == null)
      {
        return NotFound();
      }

      _context.Users.Remove(user);
      await _context.SaveChangesAsync();

      return NoContent();
    }

        // api/Users/auth
        [HttpGet("auth")]
        public IActionResult AuthenticateUser([FromHeader] AuthenticateUserRequest authenticateUserRequest)
        {
            // gets a single entry from DB with matching username and password, stores in a <= 1 length list
            var query = (from user in _context.Users
                         where user.Username == authenticateUserRequest.Username
                         where user.Password == authenticateUserRequest.Password
                         select new UserResponse
                         { id = user.Id, firstName = user.FirstName, lastName = user.LastName, username = user.Username }).ToList();


            // if the list has an entry, create a jwt valid for 24 hours. Otherwise, return 401
            if (query.Any())
            {
                var userResponse = query.First();

                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.Value.AuthKey));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                //Create a List of Claims
                var permClaims = new List<Claim>();
                permClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
                permClaims.Add(new Claim("username", userResponse.username));
                permClaims.Add(new Claim("id", userResponse.id.ToString()));
                if (userResponse.firstName != null)
                {
                    permClaims.Add(new Claim("firstname", userResponse.firstName));
                }
                if (userResponse.lastName != null)
                {
                    permClaims.Add(new Claim("lastname", userResponse.lastName));
                }

                //Create Security Token object by giving required parameters    
                var token = new JwtSecurityToken(_config.Value.AuthIssuer,
                  _config.Value.AuthIssuer,
                  permClaims,
                  expires: DateTime.Now.AddDays(1),
                  signingCredentials: credentials);
                var jwt_token = new JwtSecurityTokenHandler().WriteToken(token);
                
                return Ok(jwt_token);
            }
            else
            {
                // user could not be found
                return Unauthorized("Invalid username or password.");
            }
        }

        private bool UserExists(long id)
    {
      return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
    }

  }
}
