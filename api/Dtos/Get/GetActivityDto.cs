using api.Models;

namespace api.DTOs.Get
{
    public class GetActivityDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public Status Status { get; set; }
    }
}
