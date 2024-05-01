using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Activity
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Title { get; set; } = "";

        public bool IsComplete { get; set; } = false;

        [Required]
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    }
}