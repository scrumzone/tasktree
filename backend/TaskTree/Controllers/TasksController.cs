using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using TaskTree.Models;
using TaskTree.Models.Requests;
using TaskTree.Models.Responses;
using Task = TaskTree.Models.Task;

namespace TaskTree.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : TaskTreeControllerBase
    {
        private readonly TaskTreeContext _context;
        private readonly IMapper _mapper;
        private readonly IOptions<AppConfig> _config;

        public TasksController(TaskTreeContext context, IMapper mapper, IOptions<AppConfig> config)
        {
            _context = context;
            _mapper = mapper;
            _config = config;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskResponse>>> GetTasks()
        {
            List<TaskResponse> tasks = new List<TaskResponse>();

            foreach (var task in _context.Tasks)
            {
                tasks.Add(_mapper.Map<Task, TaskResponse>(task));
            }

            return tasks;

        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Task>> GetTask(long id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // PUT: api/Tasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(long id, UpdateTaskRequest updateTaskRequest)
        {
            if (_context.Tasks == null)
            {
                return Problem("Entity set 'TaskTreeContext.Tasks' is null.", statusCode: 500);
            }

            if (CurrentUserIdDoesNotMatch(id))
            {
                return Unauthorized();
            }

            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            _mapper.Map(updateTaskRequest, task);

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
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

        // POST: api/Tasks
        [HttpPost]
        public async Task<ActionResult<Task>> CreateTask(CreateTaskRequest createTaskRequst)
        {
            if (_context.Tasks == null)
            {
                return Problem("Entity set 'TaskTreeContext.Tasks' is null.", statusCode: 500);
            }

            var task = _mapper.Map<Task>(createTaskRequst);

            _context.Tasks.Add(task);

            try
            {
                await _context.SaveChangesAsync();
            } catch(Exception e)
            {
                var exceptionCode = e.HResult;

                // If the SQL server is down
                if (exceptionCode == -2146233079)
                {
                    return StatusCode(503, "Unable to connect database");
                }

                // duplicate task
                else if (exceptionCode == -2146233088)
                {
                    return BadRequest("Task already exists");
                }
            }

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, _mapper.Map<Task, TaskResponse>(task));
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(long id)
        {
            if (_context.Tasks == null)
            {
                return Problem("Entity set 'TaskTreeContext.Users' is null.", statusCode: 500);
            }

            if (CurrentUserIdDoesNotMatch(id))
            {
                return Unauthorized();
            }

            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskExists(long id)
        {
            return (_context.Tasks?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
