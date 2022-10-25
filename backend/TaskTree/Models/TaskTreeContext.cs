using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using TaskTree.Models.Responses;

namespace TaskTree.Models;

public class TaskTreeContext : DbContext
{
    public TaskTreeContext(DbContextOptions<TaskTreeContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // create one-to-many relation with user and projects
        modelBuilder.Entity<User>()
          .HasMany(u => u.Projects)
          .WithOne(p => p.User)
          .OnDelete(DeleteBehavior.Cascade);

        // create one-to-one relationship with project and task
        modelBuilder.Entity<Project>()
          .HasOne(p => p.Root)
          .WithOne(t => t.Project)
          .OnDelete(DeleteBehavior.Cascade);

        // create one-to-many relationship with task and task
        modelBuilder.Entity<Task>()
          .HasOne(t => t.Parent)
          .WithMany(t => t.Children)
          .OnDelete(DeleteBehavior.Cascade);
    }

    public override int SaveChanges(bool acceptChangesOnSuccess)
    {
        OnBeforeSave();
        return base.SaveChanges(acceptChangesOnSuccess);
    }

    public override async Task<int> SaveChangesAsync(bool acceptChangesOnSuccess,
      CancellationToken cancellationToken = default(CancellationToken))
    {
        OnBeforeSave();
        return (await base.SaveChangesAsync(acceptChangesOnSuccess, cancellationToken));
    }

    private void OnBeforeSave()
    {
        var entries = ChangeTracker.Entries();
        var currentDateTime = DateTime.UtcNow;

        foreach (var entry in entries)
        {
            if (entry.Entity is BaseEntity trackable)
            {
                switch (entry.State)
                {
                    case EntityState.Modified:
                        trackable.UpdatedAt = currentDateTime;
                        entry.Property(nameof(trackable.CreatedAt)).IsModified = false; /* ensure that CreatedAt won't be changed */
                        break;
                    case EntityState.Added:
                        trackable.UpdatedAt = currentDateTime;
                        trackable.CreatedAt = currentDateTime;
                        break;
                }
            }
        }
    }

    // add DbSets here
    public DbSet<User> Users { get; set; }
    public DbSet<Task> Tasks { get; set; }
    public DbSet<Project> Projects { get; set; }
}
