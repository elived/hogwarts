using HogwartsHouses.DAL;
using HogwartsHouses.Data;
using HogwartsHouses.Models;
using HogwartsHouses.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace HogwartsHouses
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();

            builder.Services.AddDbContext<AppDbContext>(options => 
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
            
            
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            builder.Services.AddSingleton<IRepository<Room>, InMemoryRoomRepository>();
            builder.Services.AddScoped<IRoomService, RoomService>();

            builder.Services.AddSingleton<IStudentRepository<Student>, StudentRepository>();
            builder.Services.AddScoped<IStudentService, StudentService>();

            var app = builder.Build();
            
            
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }


            app.MapControllers();
            app.Run();

        }
    }
}
