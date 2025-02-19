using System.ComponentModel.DataAnnotations;

namespace ProjectHubAPI.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        [Required]
        public string Status { get; set; } = "Ej påbörjad";
    }
}
