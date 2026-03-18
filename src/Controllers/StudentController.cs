using HogwartsHouses.Models.Types;
using HogwartsHouses.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace HogwartsHouses.Controllers;

[ApiController]
[Route("[controller]")]
public class StudentController : ControllerBase
{
    private readonly IStudentService _service;
    
    public StudentController(IStudentService service)
    {
        _service = service;
    }

    [HttpGet]
    public IActionResult GetAllStudents()
    {
        return Ok(_service.GetAllStudents());
    }

    [HttpGet("{id:int}")]
    public IActionResult GetStudentById(int id)
    {
        return Ok(_service.GetStudentById(id));
    }

    [HttpPost]
    public IActionResult AddStudent(int id, string name, HouseType house, PetType pet)
    {
        return Ok(_service.AddStudent(id, name, house, pet));
    }

    [HttpPut("{id:int}")]
    public IActionResult UpdateStudent(int id, string name, HouseType house, PetType pet)
    {
        return Ok(_service.UpdateStudent(id, name, house, pet));
    }

    [HttpDelete("{id:int}")]
    public IActionResult RemoveStudent(int id)
    {
        return Ok(_service.RemoveStudent(id));
    }

    [HttpPut("{id:int}/enforce-house-match")]
    public IActionResult AssignStudentToRoom(int studentId, int roomId)
    {
        return Ok(_service.AssignStudentToRoom(studentId, roomId));
    }
}