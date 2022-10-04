using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace TaskTree.Models
{
	[Index(nameof(Id), IsUnique = true)]
	public class Project : BaseEntity
	{
		[Required]
		public int Name { get; set; }
		public string? Description { get; set; }
		public Task? Root { get; set; }
		public double? Progress	{ get; set; }
	}
}
