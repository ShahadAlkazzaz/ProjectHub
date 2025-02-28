using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace ProjectHubAPI.Models
{
    [Index(nameof(CustomerNumber), IsUnique = true)] //  Gör CustomerNumber unikt
    public class Customer
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.None)] //  Vi hanterar detta manuellt
        public int CustomerNumber { get; set; } //  Unikt kundnummer

        //  En kund kan ha flera projekt
        [JsonIgnore] // Detta hindrar att Projects serialiseras i Customer
        public ICollection<Project> Projects { get; set; } = new List<Project>();
    }
}
