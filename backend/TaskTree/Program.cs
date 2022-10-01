using Microsoft.EntityFrameworkCore;
using TaskTree.Models;

var builder = WebApplication.CreateBuilder(args);

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
  options.AddPolicy(MyAllowSpecificOrigins, policy =>
  {
    policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
  });
});

// allow for environment variables to override configuration
builder.Configuration.AddEnvironmentVariables();


// Add services to the container.
builder.Services.AddDbContext<TaskTreeContext>(opt =>
{
  opt.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), new MySqlServerVersion(new Version(8, 0)));
});

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Program));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  // app.UseDeveloperExceptionPage();
  app.UseSwagger();
  app.UseSwaggerUI();
}
else if (app.Environment.IsProduction())
{
  app.UseHttpsRedirection();
}


// app.UseAuthorization();

app.MapControllers();
app.UseCors(MyAllowSpecificOrigins);
app.Run();
