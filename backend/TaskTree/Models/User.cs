using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TaskTree.Models;

[Index(nameof(Username), IsUnique = true)]
public class User : BaseEntity
{
    [Required]
    public string Username { get; set; }
    [Required]
    public string Password { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}
