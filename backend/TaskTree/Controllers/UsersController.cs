using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

    public UsersController(TaskTreeContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }


    // GET: api/users/5
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
    // TODO: ensure only authorized user can update their account
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
    // TODO: ensure only authorized user can delete their account
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
    public async Task<IActionResult> AuthenticateUser([FromHeader] AuthenticateUserRequest authenticateUserRequest)
    {
      var query = from user in _context.Users
                  where user.Username == authenticateUserRequest.Username
                  where user.Password == authenticateUserRequest.Password
                  select new { user.Id, user.FirstName, user.LastName, user.Username };



      if (query.Any())
      {
        var userResponse = query.AsEnumerable().First();
        string key = "my_secret_key_12345"; //Secret key which will be used later during validation    
        var issuer = "http://mysite.com";  //normally this will be your site URL    
  
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));    
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);    
  
        //Create a List of Claims, Keep claims name short    
        var permClaims = new List<Claim>();    
        permClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));    
        permClaims.Add(new Claim("username", authenticateUserRequest.Username));    
        permClaims.Add(new Claim("id", userId));    
        permClaims.Add(new Claim("firstname", "bilal"));    
  
        //Create Security Token object by giving required parameters    
        var token = new JwtSecurityToken(issuer, //Issure    
                        issuer,  //Audience    
                        permClaims,    
                        expires: DateTime.Now.AddDays(1),    
                        signingCredentials: credentials);    
        var jwt_token = new JwtSecurityTokenHandler().WriteToken(token);    
        return new { data = jwt_token };
      }
      else
      {
        // user could not be found
        return BadRequest("Invalid username or password.");
      }
    }

        private bool UserExists(long id)
    {
      return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
    }

  }
}
