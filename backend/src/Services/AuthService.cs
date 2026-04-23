using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using HogwartsHouses.Data;
using HogwartsHouses.DTO;
using HogwartsHouses.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace HogwartsHouses.Services;

public class AuthService : IAuthService 
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public AuthService(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }
    public async Task<List<UserDto>> GetUserAsync()
    {
        return await _context.Users
            .Select(u => new UserDto
            {
                Username = u.UserName,
                Role = u.Role
            }).ToListAsync();
    }
    public async Task<UserDto?> GetUserByUsernameAsync(string username)
    {
        return await _context.Users
            .Where(u => u.UserName == username)
            .Select(u => new UserDto
            {
                Username = u.UserName,
                Role = u.Role
            }).FirstOrDefaultAsync();
    }
    
    public async Task<string> LoginAsync(UserDto request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == request.Username);
        if (user is null)
            return null;

        if (new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash, request.Password) ==
            PasswordVerificationResult.Failed)
        {
            return null;
        }

        return CreateToken(user);
    }

    public async Task<User?> RegisterAsync(UserDto request)
    {
        if (await _context.Users.AnyAsync(u => u.UserName == request.Username))
            return null;

        var user = new User();
        var hashedPassword = new PasswordHasher<User>().HashPassword(user, request.Password);
        
        user.UserName = request.Username;
        user.PasswordHash = hashedPassword;
        user.Role = "User";

        _context.Users.Add(user);
        await _context.SaveChangesAsync();      

        return user;
    }

    private string CreateToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_config["AppSettings:Token"]!));
        
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var tokenDescriptor = new JwtSecurityToken(
            issuer: _config.GetValue<string>("AppSettings:Issuer"),
            audience: _config.GetValue<string>("AppSettings:Audience"),
            claims: claims,
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: creds
        );
        return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
    }

    public async Task<bool> DeleteUserAsync(string username)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);

        if (user == null)
            return false;

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return true;
    }
    
    public async Task<bool> UpdateRoleAsync(string username, string newRole)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);

        if (user == null)
            return false;

        user.Role = newRole;
        await _context.SaveChangesAsync();

        return true;
    }
}