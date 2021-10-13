using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationSevicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
                 
            services.AddDbContext<DataContext>(options => {
                options.UseSqlServer(config.GetConnectionString("develop"));
            });

            return services;
        }


    }
}