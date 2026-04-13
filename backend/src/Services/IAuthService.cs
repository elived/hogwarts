using System.Threading.Tasks;
using HogwartsHouses.DTO;
using HogwartsHouses.Models;

namespace HogwartsHouses.Services;

public interface IAuthService
{
    Task<User> RegisterAsync(UserDto request);
    Task<string?> LoginAsync(UserDto request);
    Task<bool> DeleteUserAsync(string username);
}