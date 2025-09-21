using GraphQL.Types;
using Task = TaskTracker.API.Models.Task;

namespace TaskTracker.API.GraphQL.Types
{
    public class TaskType : ObjectGraphType<Task>
    {
        public TaskType()
        {
            Field(x => x.Id).Description("The Id of the task");
            Field(x => x.Title).Description("The title of the task");
            Field(x => x.Description).Description("The description of the task");
            Field<TaskStatusType>("Status").Description("The status of the task");
        }
    }
}
