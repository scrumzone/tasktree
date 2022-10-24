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
    [Route("api/tasks")]
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

        // GET: api/projects/{projectId}/tasks
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<TaskResponse>> GetTasks(long projectId)
        {
            var project = await _context.Projects.FindAsync(projectId);

            if (project == null)
            {
                return NotFound();
            }

            // Is valid user
            if (CurrentUserIdDoesNotMatch(project.User.Id))
            {
                return Unauthorized();
            }

            var root = _mapper.Map<Task, TaskResponse>(project.Root);

            return root;
        }

        // GET: api/Tasks/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskResponse>> GetTask(long id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            // Is valid user
            long userId = GetUserId(task);
            if (CurrentUserIdDoesNotMatch(userId))
            {
                return Unauthorized();
            }

            var taskResponse = _mapper.Map<Task, TaskResponse>(task);

            return taskResponse;
        }

        // PUT: api/Tasks/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(long id, UpdateTaskRequest updateTaskRequest)
        {
            if (_context.Tasks == null)
            {
                return Problem("Entity set 'TaskTreeContext.Tasks' is null.", statusCode: 500);
            }

            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            // Is valid user
            long userId = GetUserId(task);
            if (CurrentUserIdDoesNotMatch(userId))
            {
                return Unauthorized();
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

        // POST: api/tasks/{parentId}/create
        [Authorize]
        [HttpPost("{parentId}/create")]
        public async Task<ActionResult<Task>> CreateTask(long parentId, CreateTaskRequest createTaskRequst)
        {
            if (_context.Tasks == null)
            {
                return Problem("Entity set 'TaskTreeContext.Tasks' is null.", statusCode: 500);
            }

            // Get the user id from the parent task
            var parentTask = await _context.Tasks.FindAsync(parentId);
            long userId = GetUserId(parentTask);

            // Is valid user
            if (CurrentUserIdDoesNotMatch(userId))
            {
                return Unauthorized();
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
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(long id)
        {
            if (_context.Tasks == null)
            {
                return Problem("Entity set 'TaskTreeContext.Users' is null.", statusCode: 500);
            }

            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            // User is not valid
            long userId = GetUserId(task);
            if (CurrentUserIdDoesNotMatch(userId))
            {
                return Unauthorized();
            }

            // Task is the root
            if (task.ProjectId != null)
            {
                return Problem("Cannot delete root node", statusCode: 400);
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskExists(long id)
        {
            return (_context.Tasks?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private long GetUserId(Task task)
        {
            while (task.Parent != null)
            {
                task = task.Parent;
            }

            return task.Project.User.Id;
        }
    }

}
