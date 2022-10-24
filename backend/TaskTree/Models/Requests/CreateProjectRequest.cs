using TaskTree.Models.Responses;

namespace TaskTree.Models.Requests
{
    public class CreateProjectRequest
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public double? Progress { get; set; }
    }
}
