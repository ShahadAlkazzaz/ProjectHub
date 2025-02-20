using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore; // 🔹 Viktigt att importera EF Core!

namespace ProjectHubAPI.Models
{
    [Index(nameof(ProjectNumber), IsUnique = true)] // 🔹 Gör ProjectNumber unikt
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
        [DatabaseGenerated(DatabaseGeneratedOption.None)] // 🔹 Vi hanterar detta manuellt
        public int ProjectNumber { get; set; }

        [Required]
        public string Customer { get; set; } = string.Empty;

        [Required]
        public string ProjectManager { get; set; } = string.Empty;

        [Required]
        public string Service { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }


    }
}



//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;
//using Microsoft.EntityFrameworkCore;

//namespace ProjectHubAPI.Models
//{
//    [Index(nameof(ProjectNumber), IsUnique = true)] // 🔹 Gör ProjectNumber unikt
//    public class Project
//    {
//        [Key]
//        public int Id { get; set; }

//        [Required]
//        public string Name { get; set; } = string.Empty;

//        [Required]
//        public DateTime StartDate { get; set; }

//        public DateTime? EndDate { get; set; }

//        [Required]
//        public string Status { get; set; } = "Ej påbörjad";

//        [Required]
//        [DatabaseGenerated(DatabaseGeneratedOption.None)] // 🔹 Vi hanterar detta manuellt
//        public int ProjectNumber { get; set; }

//        // 🔽 NYA FÄLT 🔽
//        [Required]
//        public string Customer { get; set; } = string.Empty; // Kund kopplad till projektet

//        [Required]
//        public string ProjectManager { get; set; } = string.Empty; // Projektansvarig

//        [Required]
//        public string Service { get; set; } = string.Empty; // Tjänst kopplad till projektet

//        [Required]
//        [Column(TypeName = "decimal(18,2)")] // 🔹 Sätter decimal precision
//        public decimal TotalPrice { get; set; } // Totalpris för projektet
//    }
//}
