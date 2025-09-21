using System.ComponentModel.DataAnnotations;
using TaskTracker.API.HelperModels;

namespace TaskTracker.API.Models
{
    public class Task
    {
        [Key]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public StatusEnum Status { get; set; }
    }
}
