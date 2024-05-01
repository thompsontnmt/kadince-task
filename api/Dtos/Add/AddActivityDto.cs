using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Add
{
    public class AddActivityDto
    {
        [Required]
        public string Title { get; set; } = "";

    }
}
