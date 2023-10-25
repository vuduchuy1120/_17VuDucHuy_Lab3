using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using _17VuDucHuy_Lab3.Models;

    public class Lab3Context : DbContext
    {
        public Lab3Context (DbContextOptions<Lab3Context> options)
            : base(options)
        {
        }

        public DbSet<_17VuDucHuy_Lab3.Models.Product> Product { get; set; } = default!;
    }
