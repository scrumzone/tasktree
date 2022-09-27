using Microsoft.EntityFrameworkCore;
using TaskTree.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<TaskTreeContext>(opt =>
{
  opt.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), new MySqlServerVersion(new Version("1.0.0")));
});


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  // app.UseDeveloperExceptionPage();
  app.UseSwagger();
  app.UseSwaggerUI(); /* do we need swagger? not sure if well even use openapi... */
}
else if (app.Environment.IsProduction())
{
  app.UseHttpsRedirection();
}


// app.UseAuthorization();

app.MapControllers();

app.Run();
