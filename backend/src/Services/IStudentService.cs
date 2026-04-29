using System.Collections.Generic;
using System.Threading.Tasks;
using HogwartsHouses.Models;
using HogwartsHouses.Models.Types;

namespace HogwartsHouses.Services;

public interface IStudentService
{
    Task<IEnumerable<Student>> GetAllStudents();
    Task<Student?> GetStudentById(int id);
    Task<Student?> GetStudentByUsernameAsync(string username);

    Task<IEnumerable<Student>> AddStudent(int id, string name, HouseType house, PetType pet, int roomId);

    Task<Student?> UpdateStudent(int id, string name, HouseType house, PetType pet, int roomId);
    Task<Student?> RemoveStudent(int id);
  
    Task<Student> BecomeStudentAsync(string username, CreateStudentRequest dto);
}