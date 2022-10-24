using TaskTree.Models.Responses;

namespace TaskTree.Models.Requests
{
    public class CreateTaskRequest
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public double? Weight { get; set; }
    }
}
