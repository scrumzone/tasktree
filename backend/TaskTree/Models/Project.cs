using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace TaskTree.Models
{
    public class Project : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        public string? Description { get; set; }
        public Task? Root { get; set; }
        public double? Progress	{ get; set; }
        [Required]
        public User User { get; set; }
    }
}
