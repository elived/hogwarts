using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using HogwartsHouses.DAL;
using HogwartsHouses.Data;
using HogwartsHouses.Models;
using HogwartsHouses.Models.Types;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace HogwartsHouses.Services;

public class StudentService : IStudentService
{
    private readonly AppDbContext _db;

    public StudentService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<IEnumerable<Student>> GetAllStudents()
    {
        return await _db.Students
            .Include(s => s.Room)
            .ToListAsync();
    }

    public async Task<Student?> GetStudentById(int id)
    {
        return await _db.Students
            .Include(s => s.Room)
            .FirstOrDefaultAsync(s => s.Id == id);
    }
    
    public async Task<Student?> GetStudentByUsernameAsync(string username)
    {
        return await _db.Students
            .Include(s => s.Room)
            .Include(s => s.User)
            .FirstOrDefaultAsync(s => s.User.UserName == username);
    }
    

    public async Task<IEnumerable<Student>> AddStudent(int id, string name, HouseType house, PetType pet, int roomId)
    {
        if (await _db.Students.AnyAsync(s => s.Id == id)) throw new InvalidOperationException($"A student with {id} already exists");

        var room = await _db.Rooms
            .Include(r => r.Students)
            .FirstOrDefaultAsync(r => r.Id == roomId);
        if (room == null)
            throw new InvalidOperationException($"Room ID {roomId} does not exist.");

        if (room.House != house)
            throw new InvalidOperationException($"House mismatch: A room in {room.House} cannot be assigned to {house} student");
        
        if (room.Students.Count >= room.MaxCapacity)
            throw new InvalidOperationException($"Room {room.Id} is full.");

        var student = new Student
        {
            Id = id,
            House = house,
            Name = name,
            Pet = pet,
            RoomId = roomId
        };
        _db.Students.Add(student);
        await _db.SaveChangesAsync();
        
        return await _db.Students
            .Include(s => s.Room)
            .ToListAsync();
    }

    public async Task<Student?> UpdateStudent(int id, string name, HouseType house, PetType pet, int roomId)
    {
        var student = await _db.Students.FindAsync(id);
        if (student == null) return null;  
        
        student.Name = name;
        student.House = house;
        student.Pet = pet;
        student.RoomId = roomId;
        
        await _db.SaveChangesAsync();
        return student;
    }

    public async Task<Student?> RemoveStudent(int id)
    {
        var student = await _db.Students.FindAsync(id);
        if (student == null) return null;
        
        _db.Students.Remove(student);
        await _db.SaveChangesAsync();
        return student;
    }

    public async Task<Student> AssignStudentToRoom(int studentId, int roomId)
    {
        
        var student = await _db.Students
            .Include(s => s.Room)
            .FirstOrDefaultAsync(s => s.Id == studentId);

        if (student == null)
            throw new Exception($"Student with id {studentId} does not exist");

        var room = await _db.Rooms
            .Include(r => r.Students)  // ✅ Needed for capacity + assignments
            .FirstOrDefaultAsync(r => r.Id == roomId);

        if (room == null)
            throw new Exception($"Room with id {roomId} does not exist");

        if (student.House != room.House) throw new InvalidOperationException($"House mismatch: A {student.House} student cannot be assigned to {room.House} room");

        if (room.Students.Count >= room.MaxCapacity)
            throw new InvalidOperationException($"Room {room.Id} is full");
        
        // Remove from previous room if necessary
        if (student.Room != null && student.RoomId != room.Id)
        {
            var previousRoom = await _db.Rooms
                .Include(r => r.Students)
                .FirstOrDefaultAsync(r => r.Id == student.RoomId);

            previousRoom.Students.Remove(student);
        }

        // Link both sides
        student.RoomId = room.Id;

        if (!room.Students.Any(s => s.Id == student.Id))
            room.Students.Add(student);
        
        return student;
    }

    public async Task<Student> BecomeStudentAsync(string username, CreateStudentRequest dto)
    {
        var user = await _db.Users
            .Include(u => u.Student)
            .FirstOrDefaultAsync(u => u.UserName == username);
        
        if (user == null)
            throw new Exception($"User {user} not found");
        
        if (user.Student != null)
            throw new InvalidAsynchronousStateException($"User {username} is already a student: {user.Student}");
        
        var house = CalculateHouse(dto.Answers);

        var room = await _db.Rooms
            .Include(r => r.Students)
            .FirstOrDefaultAsync(r => r.House == house && r.Students.Count < r.MaxCapacity);
        
        if (room == null)
            throw new Exception($"No available rooms for house {house}");
        
        var student = new Student
        {
            Name = dto.Name,
            House = house,
            Pet = dto.Pet,
            RoomId = room.Id,
            UserId = user.Id,
            User = user
        };

        _db.Students.Add(student);
        await _db.SaveChangesAsync();

        return student; 
    }
    
    
    private HouseType CalculateHouse(List<SortingAnswerHouse> answers)
    {
        // simple logic for now
        return answers
            .GroupBy(a => a.House)
            .OrderByDescending(g => g.Count())
            .First()
            .Key;
    }

}