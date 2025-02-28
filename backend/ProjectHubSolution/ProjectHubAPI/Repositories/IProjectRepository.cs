using ProjectHubAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectHubAPI.Repositories
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetAllProjects();
        Task<Project?> GetProjectById(int id);
        Task AddProject(Project project);
        Task UpdateProject(Project project);
        Task DeleteProject(int id);
    }
}
