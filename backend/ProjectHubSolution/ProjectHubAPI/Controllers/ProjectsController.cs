using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectHubAPI.Data;
using ProjectHubAPI.Models;

namespace ProjectHubAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProjectsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            return await _context.Projects.ToListAsync();
        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            return project;
        }

        // POST: api/Projects
        [HttpPost]
        public async Task<ActionResult<Project>> PostProject(Project project)
        {
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
        }

        // PUT: api/Projects/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, Project updatedProject)
        {
            if (id != updatedProject.Id)
            {
                return BadRequest("Projekt-ID matchar inte.");
            }

            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound("Projektet hittades inte.");
            }

            // Uppdatera fälten (utom ProjectNumber)
            project.Name = updatedProject.Name;
            project.StartDate = updatedProject.StartDate;
            project.EndDate = updatedProject.EndDate;
            project.Status = updatedProject.Status;
            project.Customer = updatedProject.Customer;
            project.ProjectManager = updatedProject.ProjectManager;
            project.Service = updatedProject.Service;
            project.TotalPrice = updatedProject.TotalPrice;

            await _context.SaveChangesAsync();
            return NoContent(); // 204 - OK men inget att returnera
        }


        // DELETE: api/Projects/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound("Projektet hittades inte.");
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return NoContent(); // 204 - OK men inget att returnera
        }

    }
}
