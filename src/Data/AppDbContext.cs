using HogwartsHouses.Models;
using HogwartsHouses.Models.Types;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HogwartsHouses.Data;

public class AppDbContext : IdentityDbContext<Users>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
     
    public DbSet<Room> Rooms { get; set; }
    public DbSet<Student> Students { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Room>(e =>
        {
            e.ToTable("Rooms");
            e.Property(p => p.Name).HasColumnName("Name");
            e.Property(p => p.House).HasColumnName("House");
            
        });

        modelBuilder.Entity<Student>(e =>
        {
            e.ToTable("Students");
            e.Property(p => p.Name).HasColumnName("Name");
            e.Property(p => p.House).HasColumnName("House");
            e.Property(p => p.Pet).HasColumnName("Pet");
        });
        
        // seeding data into database
        modelBuilder.Entity<Room>().HasData(
            new Room
            {
                Id = 1,
                Name = "Bedroom 1",
                House = HouseType.Gryffindor,
                MaxCapacity = 4
            },
            new Room
            {
                Id = 2,
                Name = "Bedroom 2",
                House = HouseType.Gryffindor,
                MaxCapacity = 2
            },
            new Room
            {
                Id = 4,
                Name = "Bedroom 1",
                House = HouseType.Slytherin,
                MaxCapacity = 4
            },
            new Room
            {
                Id = 5,
                Name = "Bedroom 2",
                House = HouseType.Slytherin,
                MaxCapacity = 2
            }
        );

    }
}