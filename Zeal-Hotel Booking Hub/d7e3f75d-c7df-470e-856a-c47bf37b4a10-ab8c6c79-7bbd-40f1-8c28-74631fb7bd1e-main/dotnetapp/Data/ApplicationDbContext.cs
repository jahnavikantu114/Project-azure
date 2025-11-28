using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace dotnetapp.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {


        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base (options){}
        public DbSet<Room> Rooms{get;set;}
        public DbSet<Booking> Bookings{get;set;}
        public DbSet<Feedback> Feedbacks{get;set;}
        public DbSet<User> Users{get;set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Booking>()
            .HasOne(b => b.Room)
            .WithMany()
            .HasForeignKey(b => b.RoomId);
        }
      

    }
}
