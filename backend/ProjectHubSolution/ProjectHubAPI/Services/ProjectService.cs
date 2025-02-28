using ProjectHubAPI.Factories;
using ProjectHubAPI.Models;
using ProjectHubAPI.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectHubAPI.Services
{
    public class ProjectService(IProjectRepository projectRepository)
    {
        private readonly IProjectRepository _projectRepository = projectRepository;

        public async Task<IEnumerable<Project>> GetAllProjects()
        {
            return await _projectRepository.GetAllProjects();
        }

        public async Task<Project?> GetProjectById(int id)
        {
            return await _projectRepository.GetProjectById(id);
        }

        public async Task AddProject(string name, DateTime startDate, DateTime? endDate, string status, int projectNumber, string projectManager, string service, decimal totalPrice, int customerId)
        {
            var project = ProjectFactory.CreateProject(name, startDate, endDate, status, projectNumber, projectManager, service, totalPrice, customerId);
            await _projectRepository.AddProject(project);
        }

        public async Task UpdateProject(Project project)
        {
            await _projectRepository.UpdateProject(project);
        }

        public async Task DeleteProject(int id)
        {
            await _projectRepository.DeleteProject(id);
        }
    }
}
