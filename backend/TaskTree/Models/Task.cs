using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace TaskTree.Models
{
	[Index(nameof(Name), IsUnique = true)]
	public class Task : BaseEntity
	{
		[Required]
		public string Name { get; set; }
		public string? Description { get; set; }
		public double? Progress { get; set; }
		public List<Task>? Children { get; set; }
	}
}
