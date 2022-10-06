using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace TaskTree.Models;

public class TaskTreeContext : DbContext
{
  public TaskTreeContext(DbContextOptions<TaskTreeContext> options) : base(options)
  {
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<Project>()
      .HasOne<User>()
      .WithMany()
      .HasForeignKey(p => p.Id);

    modelBuilder.Entity<Task>()
      .HasOne<Project>()
      .WithOne(p => p.Root)
      .HasForeignKey<Task>(t => t.Id);

    modelBuilder.Entity<Task>()
      .HasOne<Task>()
      .WithMany(t => t.Children)
      .HasForeignKey(t => t.Id);
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

}