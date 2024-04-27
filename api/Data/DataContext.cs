using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
            
        }

    public DbSet<Activity> Activities { get; set; }
    }
}