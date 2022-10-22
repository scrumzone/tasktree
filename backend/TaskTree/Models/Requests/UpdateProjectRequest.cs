using TaskTree.Models.Responses;

namespace TaskTree.Models.Requests;

public class UpdateProjectRequest
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public TaskResponse? Root { get; set; }
    public double? Progress { get; set; }
}
