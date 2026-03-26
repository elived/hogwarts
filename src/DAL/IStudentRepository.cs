using System.Collections.Generic;
using HogwartsHouses.Models;
using HogwartsHouses.Models.Types;

namespace HogwartsHouses.DAL;

public interface IStudentRepository<T>
{
    IEnumerable<Student> GetAllStudents();
    Student? GetStudentById(int id);
    IEnumerable<Student> AddStudent(int id, string name, HouseType house, PetType pet, int roomId);

    Student? UpdateStudent(int id, string name, HouseType house, PetType pet, int roomId);
    Student? RemoveStudent(int id);
    Student? AssignStudentToRoom(int studentId, int roomId);
}