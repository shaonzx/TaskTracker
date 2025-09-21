using GraphQL.Types;
using Microsoft.EntityFrameworkCore;
using TaskTracker.API.Data;
using TaskTracker.API.GraphQL.Types;

namespace TaskTracker.API.GraphQL.Queries
{
    public class TaskQuery : ObjectGraphType
    {
        public TaskQuery(TaskDbContext db)
        {
            Field<ListGraphType<TaskType>>("getAllTasks")
                .ResolveAsync(async a => await db.Tasks.OrderBy(x => x.Title).ToListAsync());
        }
    }
}
