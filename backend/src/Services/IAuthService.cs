using System.Collections.Generic;
using System.Threading.Tasks;
using HogwartsHouses.DTO;
using HogwartsHouses.Models;

namespace HogwartsHouses.Services;

public interface IAuthService
{
    Task<List<UserDto>> GetUserAsync();
    Task<UserDto> GetUserByUsernameAsync(string username);
    Task<User> RegisterAsync(UserDto request);
    Task<string?> LoginAsync(UserDto request);
    Task<bool> DeleteUserAsync(string username);
}