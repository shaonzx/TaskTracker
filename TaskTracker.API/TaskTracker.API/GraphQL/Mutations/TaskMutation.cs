using GraphQL;
using GraphQL.Types;
using TaskTracker.API.Data;
using TaskTracker.API.GraphQL.Types;
using TaskTracker.API.GraphQL.Types.Inputs;
using TaskTracker.API.HelperModels;
using Task = TaskTracker.API.Models.Task;

namespace TaskTracker.API.GraphQL.Mutations
{
    public class TaskMutation : ObjectGraphType
    {
        public TaskMutation(TaskDbContext db)
        {
            Field<TaskType>("createTask").Arguments(
                new QueryArgument<NonNullGraphType<TaskInputType>>()
                {
                    Name = "task",
                    Description = "The Task to add"
                }
            ).ResolveAsync(async context =>
            {
                var task = context.GetArgument<Task>("task");
                db.Tasks.Add(task);
                await db.SaveChangesAsync();
                return task;
            });

            Field<BooleanGraphType>("updateTaskStatus").Arguments(
                new QueryArgument<NonNullGraphType<IdGraphType>>()
                {
                    Name = "id",
                    Description = "The ID of the Task to update."
                }
            ).ResolveAsync(async context =>
            {
                var id = context.GetArgument<Guid>("id");
                var task = db.Tasks.FirstOrDefault(x => x.Id == id);
                if (task == null) return false;
                task.Status = task.Status == StatusEnum.Completed ? StatusEnum.Pending : StatusEnum.Completed;
                db.Tasks.Update(task);
                await db.SaveChangesAsync();
                return true;
            });
        }
    }
}
