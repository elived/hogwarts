using HogwartsHouses.Models.Types;
using HogwartsHouses.Services;
using Microsoft.AspNetCore.Mvc;

namespace HogwartsHouses.Controllers;

[ApiController]
[Route("[controller]")]
public class RoomsController : ControllerBase
{
    private readonly IRoomService _service;
    private readonly IStudentService _studentService;

    public RoomsController(IRoomService service, IStudentService studentService)
    {
        _service = service;
        _studentService = studentService;
    }

    [HttpGet]
    public IActionResult GetRooms()
    {
        return Ok(_service.GetRooms());
    }

    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
        return Ok(_service.GetById(id));
    }

    [HttpPost]
    public IActionResult Add(int id, string name, HouseType house)
    {
        return Ok(_service.Add(id, name, house));
    }

    [HttpPut("{id:int}")]
    public IActionResult Update(int id, string name, HouseType house)
    {
        return Ok(_service.Update(id, name, house));
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        return Ok(_service.Delete(id));
    }

    [HttpGet("available")]
    public IActionResult GetAvailableRooms()
    {
        var rooms = _service.GetAvailableRooms();
        return Ok(rooms);
    }

    [HttpGet("rat-owners")]
    public IActionResult GetRatSafeRooms(
        [FromQuery] bool onlyWithFreeSpace = false,
        [FromQuery] int? studentId = null,
        [FromQuery] HouseType? house = null)
    {
        if (studentId.HasValue)
        {
            var student = _studentService.GetStudentById(studentId.Value);
            if (student is null) return NotFound($"Student {studentId} not found");
            house = student.House;
        }

        var rooms = _service.GetRatSafeRooms(house, onlyWithFreeSpace);
        return Ok(rooms);
    }
}
