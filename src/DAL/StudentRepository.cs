using System;
using System.Collections.Generic;
using System.Linq;
using HogwartsHouses.Models;
using HogwartsHouses.Models.Types;

namespace HogwartsHouses.DAL;

public class StudentRepository : IStudentRepository<Student>
{
    private HashSet<Student> _students = new();
    private readonly IRepository<Room> _rooms;

    public StudentRepository(IRepository<Room> rooms)
    {
        _rooms = rooms;
        SeedStudents();
    }
    
    private void SeedStudents()
    {
        _students = new HashSet<Student>
        {
            new Student { Id = 1, Name = "Hermione", House = HouseType.Gryffindor, Pet = PetType.Cat },
            new Student { Id = 2, Name = "Draco",House = HouseType.Slytherin, Pet = PetType.None },
            new Student { Id = 3, Name = "Ron Weasley", House = HouseType.Gryffindor, Pet = PetType.Rat },
            new Student { Id = 4, Name = "Neville Longbottom", House = HouseType.Gryffindor, Pet = PetType.Rat },
            new Student { Id = 5, Name = "Harry Potter", House = HouseType.Gryffindor, Pet = PetType.Owl },
            new Student { Id = 6, Name = "Luna Lovegood", House = HouseType.Ravenclaw, Pet = PetType.Cat },
            new Student { Id = 7, Name = "Cho Chang", House = HouseType.Ravenclaw, Pet = PetType.None },
            new Student { Id = 8, Name = "Pansy Parkinson", House = HouseType.Slytherin, Pet = PetType.None },
            new Student { Id = 9, Name = "Cedric Diggory", House = HouseType.Hufflepuff, Pet = PetType.None },
            new Student { Id = 10, Name = "Ernie Macmillan", House = HouseType.Hufflepuff, Pet = PetType.None }

        };
    }
    
    public IEnumerable<Student> GetAllStudents()
    {
        return _students;
    }

    public Student? GetStudentById(int id)
    {
        if (id <= 0) throw new ArgumentOutOfRangeException(nameof(id), "ID must be positive.");
        return _students.FirstOrDefault(s => s.Id == id);
    }

    public IEnumerable<Student> AddStudent(int id, string name, HouseType house, PetType pet)
    {
        var newStudent = new Student { Id = id, Name = name, House = house, Pet = pet };
        _students.Add(newStudent);
        return _students;
    }

    public Student? UpdateStudent(int id, string name, HouseType house, PetType pet)
    {
        if (id <= 0) throw new ArgumentException("ID must be positive", nameof(id));
            
        var s = _students.FirstOrDefault(x => x.Id == id);
        if (s == null) return null;

        s.Name = name;
        s.House = house;
        s.Pet = pet;

        return s;

    }
        
    public Student? RemoveStudent(int id)
    {
        if (id <= 0) throw new ArgumentNullException(nameof(id), "ID must be positive.");
        var removed = _students.FirstOrDefault(s => s.Id == id);
        if (removed == null)
        {
            return null;

        }

        _students.Remove(removed);
        return removed;
    }
    
    public Student AssignStudentToRoom(int studentId, int roomId)
    {
        if (studentId <= 0) throw new ArgumentOutOfRangeException(nameof(studentId));
        if (roomId <= 0) throw new ArgumentOutOfRangeException(nameof(roomId));

        var student = GetStudentById(studentId) ?? throw new InvalidOperationException($"Student {studentId} not found.");
        var room = _rooms.GetById(roomId) ?? throw new InvalidOperationException($"Room {roomId} not found.");

        if (student.House != room.House)
            throw new InvalidOperationException($"House mismatch: {student.House} cannot be assigned to {room.House} room.");

        if (room.Students.Count >= room.maxCapacity)
            throw new InvalidOperationException($"Room {room.Id} is full (capacity {room.maxCapacity}).");

        // Remove from previous room if necessary
        if (student.Room != null && student.Room.Id != room.Id)
        {
            // Remove by Id to avoid reference surprises
            student.Room.Students.RemoveAll(s => s.Id == student.Id);
        }

        // Link both sides
        student.RoomId = room.Id;
        student.Room = room;

        if (!room.Students.Any(s => s.Id == student.Id))
            room.Students.Add(student);
        
        return student;
    }
}