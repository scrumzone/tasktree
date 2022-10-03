namespace TaskTree.Models.Responses;

public class UserResponse
{
    public long id { get; set; }
    public string username { get; set; }
    public string? firstName { get; set; }
    public string? lastName { get; set; }
}