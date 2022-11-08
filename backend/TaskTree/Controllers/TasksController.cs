using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
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
            var project = await _context.Projects
                .Include(project => project.Root)
                .Include("Root.Children.Children.Children.Children.Children.Children.Children.Children.Children")
                .FirstOrDefaultAsync(project => project.Id == projectId);

            if (project == null)
            {
                return NotFound();
            }

            // Is valid user
            if (CurrentUserIdDoesNotMatch(project.UserId))
            {
                return Unauthorized();
            }

            if (project.Root == null)
            {
                return Problem("Project root is null.", statusCode: 500);
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
            if (CurrentUserIdDoesNotMatch(task.UserId))
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

            var task = await _context.Tasks
                .Include("Parent.Parent.Parent.Parent.Parent.Parent.Parent.Parent.Parent")
                .Include("Children.Children.Children.Children.Children.Children.Children.Children.Children")
                .FirstOrDefaultAsync(task => task.Id == id);

            if (task == null)
            {
                return NotFound();
            }

            // Is valid user
            if (CurrentUserIdDoesNotMatch(task.UserId))
            {
                return Unauthorized();
            }

            var projId = task.RootProjectId();

            var updatingCompletionStatus = updateTaskRequest.CompletedAt.HasValue && !task.CompletedAt.HasValue;

            _mapper.Map(updateTaskRequest, task);

            // Marking complete also completes all incomplete children
            if (updatingCompletionStatus)
            {
                foreach (Task t in task.Descendents())
                {
                    if (!t.CompletedAt.HasValue)
                    {
                        t.CompletedAt = task.CompletedAt;
                        _context.Entry(t).State = EntityState.Modified;
                    }
                }
            }

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

            // After making changes, tree and project status must be re-evaluated bottom-up
            if (projId == null)
            {
                return Problem("Cannot find root project.", statusCode: 500); ;
            }

            await AuditProject((long)projId);

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

            var parentTask = await _context.Tasks
                .Include("Parent.Parent.Parent.Parent.Parent.Parent.Parent.Parent.Parent")
                .FirstOrDefaultAsync(task => task.Id == parentId);

            if (parentTask == null)
            {
                return NotFound();
            }

            // Is valid user
            if (CurrentUserIdDoesNotMatch(parentTask.UserId))
            {
                return Unauthorized();
            }

            var projId = parentTask.RootProjectId();

            var task = _mapper.Map<Task>(createTaskRequst);
            task.UserId = CurrentUserId();
            
            if (parentTask.Children == null)
            {
                parentTask.Children = new List<Task>();
            }

            parentTask.Children.Add(task);
            task.Parent = parentTask;

            try
            {
                await _context.SaveChangesAsync();
            } 
            catch(Exception e)
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

            // After making changes, tree and project status must be re-evaluated bottom-up
            if (projId == null)
            {
                return Problem("Cannot find root project.", statusCode: 500); ;
            }

            await AuditProject((long)projId);

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

            var task = await _context.Tasks
                .Include("Parent.Parent.Parent.Parent.Parent.Parent.Parent.Parent.Parent")
                .FirstOrDefaultAsync(task => task.Id == id);

            if (task == null)
            {
                return NotFound();
            }

            // User is not valid
            if (CurrentUserIdDoesNotMatch(task.UserId))
            {
                return Unauthorized();
            }

            // Task is the root
            if (task.ProjectId != null)
            {
                return Problem("Cannot delete root task", statusCode: 400);
            }

            var projId = task.RootProjectId();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            // After making changes, tree and project status must be re-evaluated bottom-up

            if (projId == null)
            {
                return Problem("Cannot find root project.", statusCode: 500); ;
            }

            await AuditProject((long)projId);

            return NoContent();
        }

        /// <summary>
        /// Audits an entire project tree from the bottom up, correcting all progress and completion values.
        /// </summary>
        /// <param name="id">The value of the <see cref="BaseEntity.Id"/> property for the desired project.</param>
        private async Task<IActionResult> AuditProject(long id)
        {
            var project = await _context.Projects
                .Include(project => project.Root)
                .Include("Root.Children.Children.Children.Children.Children.Children.Children.Children.Children")
                .FirstOrDefaultAsync(project => project.Id == id);

            if (CurrentUserIdDoesNotMatch(project?.UserId))
            {
                return Unauthorized();
            }

            if (project == null)
            {
                return NotFound();
            }

            var root = project.Root;

            if (root == null)
            {
                return Problem("Cannot find root node in 'TaskTreeContext.Tasks'.", statusCode: 500); ;
            }

            List<List<Task>> treeLayers = new List<List<Task>>();

            List<Task> thisLayer = new List<Task>();
            List<Task> nextLayer = new List<Task>();
            thisLayer.Add(root);
            while (thisLayer.Count > 0)
            {
                foreach (Task t in thisLayer)
                {
                    if (t.Children != null)
                    {
                        nextLayer.AddRange(t.Children);
                    }
                }
                treeLayers.Add(new List<Task>());
                treeLayers.Last().AddRange(thisLayer);

                thisLayer.Clear();
                thisLayer.AddRange(nextLayer);
                nextLayer.Clear();
            }

            for (int i = treeLayers.Count - 1; i >= 0; i--)
            {
                var layer = treeLayers[i];
                foreach (Task t in layer)
                {
                    t.UpdateProgress();
                    _context.Entry(t).State = EntityState.Modified;
                }
            }

            project.Progress = root.Progress;

            _context.Entry(project).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskExists(long id)
        {
            return (_context.Tasks?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
