using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace TaskTree.Models
{
    public class Task : BaseEntity
    {
        private double? _progress;

        [Required]
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public double? Weight { get; set; }
        public DateTime? CompletedAt { get; set; }
        public double? Progress
        {
            get { return _progress; }
            set { _progress = (value == null) ? null : Math.Clamp(value.Value, 0, 100); }
        }

        public long? ProjectId { get; set; }
        public Project? Project { get; set; }
        public Task? Parent { get; set; }
        public List<Task>? Children { get; set; }
        public long UserId { get; set; }

        /// <summary>
        /// Performs a breadth-first search on <see cref="Children"/> to find every <see cref="Task"/> descended from the caller.
        /// </summary>
        /// <returns>A <see cref="List{T}"/> containing every <see cref="Task"/> descended from the caller.</returns>
        public List<Task> Descendents()
        {
            if (Children == null) return new List<Task>();

            List<Task> unprocessedTasks = new List<Task>();
            List<Task> processedTasks = new List<Task>();

            unprocessedTasks.AddRange(Children);

            Task t;

            while (unprocessedTasks.Count != 0)
            {
                t = unprocessedTasks.ElementAt(0);
                if (t.Children != null) unprocessedTasks.AddRange(t.Children);
                unprocessedTasks.RemoveAt(0);
                processedTasks.Add(t);
            }

            return processedTasks;
        }
    }
}
