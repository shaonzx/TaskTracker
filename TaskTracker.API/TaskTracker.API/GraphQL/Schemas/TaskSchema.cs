using GraphQL.Types;
using TaskTracker.API.GraphQL.Mutations;
using TaskTracker.API.GraphQL.Queries;

namespace TaskTracker.API.GraphQL.Schemas
{
    public class TaskSchema : Schema
    {
        public TaskSchema(IServiceProvider provider) : base(provider)
        {
            Query = provider.GetRequiredService<TaskQuery>();
            Mutation = provider.GetRequiredService<TaskMutation>();
        }
    }
}
