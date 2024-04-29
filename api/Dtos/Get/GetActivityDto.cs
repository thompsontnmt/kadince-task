using api.Models;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Get
{
    public class GetActivityDto
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = "";

        [Required]
        public string Description { get; set; } = "";

        [Required]
        public Status Status { get; set; }
    }
}
