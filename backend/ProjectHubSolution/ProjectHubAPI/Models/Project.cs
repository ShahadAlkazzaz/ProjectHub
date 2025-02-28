using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ProjectHubAPI.Models
{
    [Index(nameof(ProjectNumber), IsUnique = true)]
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

        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ProjectNumber { get; set; } //  Unikt projektnummer

        [Required]
        public string ProjectManager { get; set; } = string.Empty;

        [Required]
        public string Service { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }

        // 🔹 Foreign Key för Customer
        [Required]
        public int CustomerId { get; set; }  // Fortfarande required
        public Customer? Customer { get; set; }  // Ej required, nullable


    }
}
