using System.Threading.Tasks;
using HogwartsHouses.Data;
using HogwartsHouses.Models.Types;
using HogwartsHouses.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace HogwartsHouses.Controllers;

[ApiController]
[Route("[controller]")]
public class RoomsController : ControllerBase
{
    private readonly IRoomService _service;
    private readonly IStudentService _studentService;
    private readonly AppDbContext _db;
    private readonly  ILogger<RoomsController> _logger;

    public RoomsController(IRoomService service, IStudentService studentService, ILogger<RoomsController> logger, AppDbContext db)
    {
        _service = service;
        _studentService = studentService;
        _logger = logger;
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetRooms()
    {
        var rooms = await _service.GetRooms();
        return Ok(rooms);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var room = await _service.GetById(id);
        if (room == null) return NotFound($"Room with id {id} not found");
        return Ok(room);
    }

    [HttpPost]
    public async Task<IActionResult> Add(int id, string name, HouseType house, int maxCapacity)
    {
        var result = await _service.Add(id, name, house, maxCapacity);
        return Ok(result);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, string name, HouseType house, int maxCapacity)
    {
        var updated = await _service.Update(id, name, house, maxCapacity);
        if (updated == null) return NotFound($"Room {id} not found");
        return Ok(updated);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.Delete(id);
        if (deleted == null) return NotFound($"Room {id} not found");
        return Ok(deleted);
    }

    [HttpGet("available")]
    public async Task<IActionResult> GetAvailableRooms()
    {
        var rooms = await _service.GetAvailableRooms();
        if (rooms is null) return NotFound("No room available");
        return Ok(rooms);
    }

    [HttpGet("rat-owners")]
    public async Task<IActionResult> GetRatSafeRooms(
        [FromQuery] bool onlyWithFreeSpace = false,
        [FromQuery] int? studentId = null,
        [FromQuery] HouseType? house = null)
    {
        if (studentId.HasValue)
        {
            var student =  _studentService.GetStudentById(studentId.Value);
            if (student is null) return NotFound($"Student {studentId} not found");
            house = student.House;
        }

        var rooms = await _service.GetRatSafeRooms(house, onlyWithFreeSpace);
        return Ok(rooms);
    }
}
