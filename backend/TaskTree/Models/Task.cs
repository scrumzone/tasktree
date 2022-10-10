using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace TaskTree.Models
{
    public class Task : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        public string? Description { get; set; }
        public double? Progress { get; set; }
        public double? Weight { get; set; }
        public DateTime? CompletedAt { get; set; }
        
        public long? ProjectId { get; set; }
        public Project? Project { get; set; }
        public Task? Parent { get; set; }
        public List<Task>? Children { get; set; }
    }
}
