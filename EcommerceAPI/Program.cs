using EcommerceAPI;
using EcommerceAPI.DbContexts;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("ECommerce") ?? throw new InvalidOperationException("Connection string 'ApplicationDbContextConnection' not found.");
builder.Services.AddDbContext<EcommerceContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddIdentity<AspNetUser, AspNetRole>()
    .AddEntityFrameworkStores<EcommerceContext>().AddDefaultTokenProviders();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
{
        builder.WithOrigins("http://localhost:3000", "http://localhost:3001")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();