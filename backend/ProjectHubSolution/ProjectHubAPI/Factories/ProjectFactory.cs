using ProjectHubAPI.Models;
using System;

namespace ProjectHubAPI.Factories
{
    public static class ProjectFactory
    {
        public static Project CreateProject(string name, DateTime startDate, DateTime? endDate, string status, int projectNumber, string projectManager, string service, decimal totalPrice, int customerId)
        {
            return new Project
            {
                Name = name,
                StartDate = startDate,
                EndDate = endDate,
                Status = status,
                ProjectNumber = projectNumber,
                ProjectManager = projectManager,
                Service = service,
                TotalPrice = totalPrice,
                CustomerId = customerId
            };
        }
    }
}
