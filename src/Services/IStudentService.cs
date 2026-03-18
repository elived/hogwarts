using System.Collections.Generic;
using HogwartsHouses.Models;
using HogwartsHouses.Models.Types;

namespace HogwartsHouses.Services;

public interface IStudentService
{
    public IEnumerable<Student> GetAllStudents();
    public Student? GetStudentById(int id);
    public IEnumerable<Student> AddStudent(int id, string name, HouseType house, PetType pet);

    public Student? UpdateStudent(int id, string name, HouseType house, PetType pet);
    public Student? RemoveStudent(int id);
    public Student AssignStudentToRoom(int studentId, int roomId);
}