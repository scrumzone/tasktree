namespace TaskTree.Models.Responses;

public class TaskResponse
{
    public long? Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public double? Progress { get; set; } = 0;
    public double? Weight { get; set; }
    public DateTime? CompletedAt { get; set; }
    public List<TaskResponse>? Children { get; set; }
    public int? ProjectId { get; set; }
}
