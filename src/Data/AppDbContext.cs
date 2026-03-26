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
            },
            
        new Room
        {
            Id = 6,
            Name = "Raven Tower Room 1",
            House = HouseType.Ravenclaw,
            MaxCapacity = 4
        },
        new Room
        {
            Id = 7,
            Name = "Raven Tower Room 2",
            House = HouseType.Ravenclaw,
            MaxCapacity = 2
        },

        // ✅ Hufflepuff
        new Room
        {
            Id = 8,
            Name = "Badger Den Room 1",
            House = HouseType.Hufflepuff,
            MaxCapacity = 4
        },
        new Room
            {
                Id = 9,
                Name = "Badger Den Room 2",
                House = HouseType.Hufflepuff,
                MaxCapacity = 2
            }
        );

        modelBuilder.Entity<Student>().HasData(
            new Student { Id = 1, Name = "Hermione", House = HouseType.Gryffindor, Pet = PetType.Cat, RoomId = 1},
            new Student { Id = 2, Name = "Draco", House = HouseType.Slytherin, Pet = PetType.None, RoomId = 4 },
            new Student { Id = 3, Name = "Ron Weasley", House = HouseType.Gryffindor, Pet = PetType.Rat, RoomId = 1},
            new Student { Id = 4, Name = "Neville Longbottom", House = HouseType.Gryffindor, Pet = PetType.Rat, RoomId = 1 },
            new Student { Id = 5, Name = "Harry Potter", House = HouseType.Gryffindor, Pet = PetType.Owl, RoomId = 1},
            new Student { Id = 6, Name = "Luna Lovegood", House = HouseType.Ravenclaw, Pet = PetType.Cat, RoomId = 6},
            new Student { Id = 7, Name = "Cho Chang", House = HouseType.Ravenclaw, Pet = PetType.None, RoomId = 6},
            new Student { Id = 8, Name = "Pansy Parkinson", House = HouseType.Slytherin, Pet = PetType.None, RoomId = 5},
            new Student { Id = 9, Name = "Cedric Diggory", House = HouseType.Hufflepuff, Pet = PetType.None, RoomId = 8},
            new Student { Id = 10, Name = "Ernie Macmillan", House = HouseType.Hufflepuff, Pet = PetType.None, RoomId = 8}
        );
    }
}