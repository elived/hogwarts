using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using HogwartsHouses.DTO;
using HogwartsHouses.Models;
using HogwartsHouses.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace HogwartsHouses.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(IAuthService authService) : ControllerBase
{
    public static User user = new User();
    
    [HttpGet("users")]
    [AllowAnonymous]
    public async Task<ActionResult<List<UserDto>>> GetAllUsers()
    {
        var users = await authService.GetUserAsync();
        return Ok(users);
    }
    
    [HttpGet("user/{username}")]
    [AllowAnonymous]
    public async Task<ActionResult> GetUserByUsername(string username)
    {
        var user = await authService.GetUserByUsernameAsync(username);
        if (user is null)            
            return NotFound("User not found"); 
        return Ok(user);
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<ActionResult<User>> Register(UserDto request)
    {
        var user = await authService.RegisterAsync(request);
        if (user is null)
            return BadRequest("Username already taken");

        return Ok(user);
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<User>> Login(UserDto request)
    {
        var token = await authService.LoginAsync(request);

        if (token is null)
            return BadRequest("Invalid username or password!");

        return Ok(token);
    }

    [HttpDelete("user/{username}")]
    //[Authorize]
    public async Task<IActionResult> DeleteAccount(string username)
    {
        if (username == null)
            return Unauthorized();

        var result = await authService.DeleteUserAsync(username);

        if (!result)
            return NotFound("User not found");

        return Ok("User deleted");
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet("find-role")]
    public async Task<IActionResult> Me()
    {
        return Ok(new
        {
            Authenicated = User.Identity!.IsAuthenticated,
            Username = User.Identity.Name,
            Role = User.FindFirst(ClaimTypes.Role)?.Value
        });
    }
}