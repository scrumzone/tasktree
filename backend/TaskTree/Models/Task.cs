using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace TaskTree.Models
{
    public class Task : BaseEntity
    {
        private double _weight = 1.0;
        private double _progress = 0.0;

        [Required]
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime? CompletedAt { get; set; }
        public double Weight
        {
            get { return _weight; }
            set
            {
                if (value <= 0.0) throw new ArgumentOutOfRangeException();
                _weight = value;
            }
        }
        public double Progress
        {
            get { return _progress; }
            set
            {
                _progress = Math.Clamp(value, 0, 100);
                if (_progress == 100.0) CompletedAt = DateTime.Now;
            }
        }

        public long? ProjectId { get; set; }
        public Project? Project { get; set; }
        public Task? Parent { get; set; }
        public List<Task>? Children { get; set; }
        public long UserId { get; set; }

        /// <summary>
        /// Performs a breadth-first search on <see cref="Children"/> to find every <see cref="Task"/> descended from the caller.
        /// </summary>
        /// <returns>A sorted <see cref="List{T}"/> containing every <see cref="Task"/> descended from the caller, from closest to furthest.</returns>
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

        /// <summary>
        /// Recursively finds the ancestors of the caller through <see cref="Parent"/>.
        /// </summary>
        /// <returns>A sorted <see cref="List{T}"/> containing every <see cref="Task"/> which is an ancestor to the caller, from closest to furthest.</returns>
        public List<Task> Ancestors()
        {
            List<Task> ancestors = new List<Task>();
            Task t = this;

            while (t.Parent != null)
            {
                t = t.Parent;
                ancestors.Add(t);
            }

            return ancestors;
        }

        /// <summary>
        /// <para>Updates <see cref="Progress"/> based on the <see cref="Weight"/> and <see cref="Progress"/> of all items in <see cref="Children"/>.</para>
        /// <para>If the caller has no children, <see cref="UpdateProgress"/> does nothing.</para>
        /// </summary>
        public void UpdateProgress()
        {
            if (Children == null || Children.Count == 0) return;

            double totalChildWeight = 0;
            double totalChildWeightCompleted = 0;

            foreach (Task t in Children)
            {
                totalChildWeight += t.Weight;
                if (t.Progress != 0)
                {
                    totalChildWeightCompleted += t.Weight * (t.Progress / 100);
                }
            }

            Progress = (totalChildWeightCompleted / totalChildWeight) * 100;
        }
    }
}
