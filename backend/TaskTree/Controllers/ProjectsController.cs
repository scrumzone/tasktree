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
using Project = TaskTree.Models.Project;
using Task = TaskTree.Models.Task;

namespace TaskTree.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : TaskTreeControllerBase
    {
        private readonly TaskTreeContext _context;
        private readonly IMapper _mapper;
        private readonly IOptions<AppConfig> _config;

        public ProjectsController(TaskTreeContext context, IMapper mapper, IOptions<AppConfig> config)
        {
            _context = context;
            _mapper = mapper;
            _config = config;
        }

        // GET: api/Projects/5
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectResponse>>> GetProjects()
        {

            var projects = _context.Projects.Where(project => project.UserId == CurrentUserId());

            List<ProjectResponse> projectResponses = new List<ProjectResponse>();
            foreach (Project project in projects)
            {
                projectResponses.Add(_mapper.Map<Project, ProjectResponse>(project));
            }
            return Ok(projectResponses);
        }

        // GET: api/Projects/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectResponse>> GetProject(long id)
        {

            var project = await _context.Projects
                .Include(project => project.Root)
                .FirstOrDefaultAsync(project => project.Id == id);

            if (CurrentUserIdDoesNotMatch(project?.UserId))
            {
                return Unauthorized();
            }

            if (project == null)
            {
                return NotFound();
            }

            return _mapper.Map<Project, ProjectResponse>(project);
        }

        // PUT: api/Projects/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(long id, UpdateProjectRequest updateProjectRequest)
        {
            if (_context.Projects == null)
            {
                return Problem("Entity set 'TaskTreeContext.Projects'  is null.", statusCode: 500);
            }

            var project = await _context.Projects.FindAsync(id);

            if (CurrentUserIdDoesNotMatch(project.UserId))
            {
                return Unauthorized();
            }

            if (project == null)
            {
                return NotFound();
            }

            _mapper.Map(updateProjectRequest, project);

            _context.Entry(project).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
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

        // POST: api/Projects
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ProjectResponse>> PostProject(CreateProjectRequest createProjectRequest)
        {
            if (_context.Projects == null)
            {
                return Problem("Entity set 'TaskTreeContext.Projects'  is null.", statusCode: 500);
            }

            var project = _mapper.Map<Project>(createProjectRequest);
            project.UserId = CurrentUserId();

            var rootTask = new Task()
            {
                Name = project.Name,
                ProjectId = project.Id,
                UserId = CurrentUserId(),
            };
            project.Root = rootTask;

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            var projectResponse = _mapper.Map<Project, ProjectResponse>(project);

            return CreatedAtAction(nameof(GetProject), new { id = project.Id }, projectResponse);
        }

        // DELETE: api/Projects/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(long id)
        {
            if (_context.Projects == null)
            {
                return Problem("Entity set 'TaskTreeContext.Projects'  is null.", statusCode: 500);
            }
            var project = await _context.Projects.FindAsync(id);

            if (CurrentUserIdDoesNotMatch(project.UserId))
            {
                return Unauthorized();
            }

            if (project == null)
            {
                return NotFound();
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectExists(long id)
        {
            return (_context.Projects?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
