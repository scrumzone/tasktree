using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskTree.Models;

public class User : BaseEntity
{
    [Required]
    public string Username { get; set; }
    [Required]
    public string Password { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}