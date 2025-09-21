using GraphQL.Types;
using Task = TaskTracker.API.Models.Task;

namespace TaskTracker.API.GraphQL.Types.Inputs
{
    public class TaskInputType : InputObjectGraphType<Task>
    {
        public TaskInputType()
        {
            Field(x => x.Title).Description("The title of the task");
            Field(x => x.Description).Description("The description of the task");
            Field<TaskStatusType>("status").Description("The status of the task");
        }
    }
}
