using TaskTree.Models.Responses;

namespace TaskTree.Models.Requests
{
    public class UpdateTaskRequest
    {
        public string? Name { get; set; } = null!;
        public string? Description { get; set; }
        public double? Progress { get; set; }
        public double? Weight { get; set; }
        public DateTime? CompletedAt { get; set; }
        public List<TaskResponse>? Children { get; set; }
    }
}
