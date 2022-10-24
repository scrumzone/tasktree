namespace TaskTree.Models.Responses;

public class ProjectResponse
{
    public string Name { get; set; }
    public string? Description { get; set; }
    public TaskResponse? Root { get; set; }
    public double? Progress { get; set; }
}
