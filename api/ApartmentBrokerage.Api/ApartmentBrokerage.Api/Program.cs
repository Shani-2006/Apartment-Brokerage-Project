using ApartmentBrokerage.Api.Services;

namespace ApartmentBrokerage.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // הגדרת CORS - מאפשר לאנגולר (localhost:4200) לגשת לשרת
            builder.Services.AddCors(options => {
                options.AddPolicy("AllowAngular", b =>
                    b.AllowAnyOrigin()
                     .AllowAnyMethod()
                     .AllowAnyHeader());
            });

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddScoped<SqlExecService>();

            var app = builder.Build();

            // חשוב: UseCors חייב להופיע לפני MapControllers
            app.UseCors("AllowAngular");

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}