using GraphQL.Types;
using TaskTracker.API.HelperModels;

namespace TaskTracker.API.GraphQL.Types
{
    public class TaskStatusType : EnumerationGraphType<StatusEnum>
    {
        public TaskStatusType()
        {
            Name = "Status";
            Description = "The status of the task";
        }
    }
}
