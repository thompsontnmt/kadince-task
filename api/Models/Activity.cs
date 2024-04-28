using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Activity
    {
        public int Id { get; set; }

        [StringLength(100)]
        public required string Title { get; set; }

        [StringLength(500)]
        public required string Description { get; set; }

        public Status Status { get; set; }

    }
}