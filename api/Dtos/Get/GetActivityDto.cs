using api.Models;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Get
{
    public class GetActivityDto
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = "";

       public bool IsComplete { get; set; } = false;

        [Required]
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    }
}
