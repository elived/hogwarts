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
    
    private readonly UserManager<User> _userManager;
    
    
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
        try
        {
            var result = await authService.DeleteUserAsync(username);
            if (!result)
                return NotFound("User not found");

            return Ok("User deleted");
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    [HttpPatch("{username}/role")]
    public async Task<IActionResult> UpdateRole(string username, [FromBody] UpdateUserRoleRequest dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Role))
            return BadRequest("Role cannot be empty");

        var role = dto.Role;
        var availableRoles = new [] { "Admin", "User" };
        
        if (!availableRoles.Contains(dto.Role))
        {
            return BadRequest($"Role not available: {dto.Role}.");
        }

        var success = await authService.UpdateRoleAsync(username, role);
        
        if(!success)
            return NotFound($"User {username} not found");
        
        return Ok($"role updated -> {role}");
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
    
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet("has-student-relation")]
    public async Task<ActionResult> Dashboard()
    {
        var username = User.Identity?.Name;

        if (username == null)
            return Unauthorized();

        var user = await authService.GetUserByUsernameAsync(username);

        if (user == null)
            return Unauthorized();

        return Ok(new
        {
            hasStudent = await authService.UserHasStudentAsync(username)
        });
    }
}