using Microsoft.EntityFrameworkCore;
using ProjectHubAPI.Models;

namespace ProjectHubAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; } 
    }
}
