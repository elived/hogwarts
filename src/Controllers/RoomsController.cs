using HogwartsHouses.Services;
using Microsoft.AspNetCore.Mvc;

namespace HogwartsHouses.Controllers;

[ApiController]
[Route("[controller]")]
public class RoomsController : ControllerBase
{
    private readonly IRoomService _service;

    public RoomsController(IRoomService service)
    {
        _service = service;
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
    public IActionResult Add(int id, string name, string house)
    {
        return Ok(_service.Add(id, name, house));
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        return Ok(_service.Delete(id));
    }
}
