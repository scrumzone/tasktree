using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

    private bool UserExists(long id)
    {
      return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
    }

  }
}
