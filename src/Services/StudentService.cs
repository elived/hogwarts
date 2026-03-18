using System.Collections.Generic;
using HogwartsHouses.DAL;
using HogwartsHouses.Models;
using HogwartsHouses.Models.Types;

namespace HogwartsHouses.Services;

public class StudentService : IStudentService
{
    private IStudentRepository<Student> _repository { get; }

    public StudentService(IStudentRepository<Student> repository)
    {
        _repository = repository;
    }

    public IEnumerable<Student> GetAllStudents()
    {
        return _repository.GetAllStudents();
    }

    public Student? GetStudentById(int id)
    {
        return _repository.GetStudentById(id);
    }

    public IEnumerable<Student> AddStudent(int id, string name, HouseType house, PetType pet)
    {
        return _repository.AddStudent(id, name, house, pet);
    }

    public Student? UpdateStudent(int id, string name, HouseType house, PetType pet)
    {
        return _repository.UpdateStudent(id, name, house, pet);
    }

    public Student? RemoveStudent(int id)
    {
        return _repository.RemoveStudent(id);
    }

    public Student AssignStudentToRoom(int studentId, int roomId)
    {
        return _repository.AssignStudentToRoom(studentId, roomId);
    }
}