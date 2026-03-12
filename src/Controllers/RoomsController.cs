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

    [HttpPost]
    public IActionResult CreateRoom(int id, string name, string house)
    {
        return Ok(_service.CreateRoom(id, name, house));
    }
}
