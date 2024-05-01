using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Update
{
    public class UpdateActivityDto
    {
        [Required]
        public string Title { get; set; } = "";

    }
}