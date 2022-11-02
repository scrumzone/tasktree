namespace TaskTree.Models.Responses;

public class ProjectResponse
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public TaskResponse? Root { get; set; }
    public double? Progress { get; set; }
}
