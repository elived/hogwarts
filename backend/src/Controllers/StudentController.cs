using System.Threading.Tasks;
using HogwartsHouses.Models.Types;
using HogwartsHouses.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace HogwartsHouses.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StudentController : ControllerBase
{
    private readonly IStudentService _service;
    
    public StudentController(IStudentService service)
    {
        _service = service;
    }

    
    [HttpGet]
    public async Task<IActionResult> GetAllStudents()
    {
        var students = await _service.GetAllStudents();
        return Ok(students);
    }
    

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetStudentById(int id)
    {
        var student = await _service.GetStudentById(id);
        if (student == null) return NotFound($"Student {id} is not found");
        
        return Ok(student);
    }
    
    
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet("check-studentStatus")]
    public async Task<IActionResult> GetMyStudent()
    {
        var username = User.Identity?.Name;

        if (username == null)
            return Unauthorized();

        var student = await _service.GetStudentByUsernameAsync(username);

        if (student == null)
            return NotFound("User is not a student");

        return Ok(student);
    }
    
    
    [HttpPost]
    public async Task<IActionResult> AddStudent(int id, string name, HouseType house, PetType pet, int roomId)
    {
        var result = await _service.AddStudent(id, name, house, pet, roomId);
        return Ok(result);
    }

    [HttpPatch("{id:int}")]
    public async Task<IActionResult> UpdateStudent(int id, string name, HouseType house, PetType pet, int roomId)
    {
        var updated = await _service.UpdateStudent(id, name, house, pet, roomId);
        if (updated == null) return NotFound($"Student {id} is not found");
        return Ok(updated);
    }
    

    [Authorize(AuthenticationSchemes =  JwtBearerDefaults.AuthenticationScheme)]
    [HttpPost("become-student")]
    public async Task<IActionResult> BecomeStudent(CreateStudentRequest request)
    {
        var username = User.Identity?.Name;

        if (username == null)
            return BadRequest("username is null");
        
        
        var student = await _service.BecomeStudentAsync(username, request);

        return Ok(student);

    }
    
    
    [Authorize(
        AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
        Roles = "Admin"
    )]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> RemoveStudent(int id)
    {
        var removed = await _service.RemoveStudent(id);
        if (removed == null) return NotFound($"Student {id} is not found");
        return Ok(removed);
    }
}