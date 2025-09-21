using GraphQL;
using Microsoft.EntityFrameworkCore;
using TaskTracker.API.Data;
using TaskTracker.API.GraphQL.Mutations;
using TaskTracker.API.GraphQL.Queries;
using TaskTracker.API.GraphQL.Schemas;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

#region Service Registrations

builder.Services.AddDbContext<TaskDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")), ServiceLifetime.Scoped);
builder.Services.AddScoped<TaskSchema>();
builder.Services.AddScoped<TaskQuery>();
builder.Services.AddScoped<TaskMutation>();
builder.Services.AddGraphQL(options =>
{
    options.AddGraphTypes().AddSystemTextJson().AddDataLoader(); // Added DataLoader to mitigate n+1 issues (This project won't have any)
});

#endregion

builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("corsapp");

// Handle preflight requests for GraphQL endpoint, CORS without it
app.Use(async (context, next) =>
{
    if (context.Request.Path.StartsWithSegments("/graphql") &&
        context.Request.Method.Equals("OPTIONS", StringComparison.OrdinalIgnoreCase))
    {
        context.Response.StatusCode = 200;
        await context.Response.CompleteAsync();
        return;
    }
    await next();
});


app.UseHttpsRedirection();
app.UseAuthorization();
app.UseGraphQL<TaskSchema>("/graphql");
app.MapControllers();

app.Run();
