using Microsoft.EntityFrameworkCore;
using Task = TaskTracker.API.Models.Task;

namespace TaskTracker.API.Data
{
    public class TaskDbContext : DbContext
    {
        public TaskDbContext(DbContextOptions<TaskDbContext> options)
            : base(options)
        {
        }

        public DbSet<Task> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // We'd like to store the enum as a string in the database
            modelBuilder.Entity<Models.Task>().Property(e => e.Status).HasConversion<string>();
        }
    }
}
