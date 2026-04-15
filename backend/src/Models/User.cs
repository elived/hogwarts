using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace HogwartsHouses.Models;

public class User : IdentityUser
{
    public int Id { get; set; }
    [JsonIgnore]
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;

    public int RoleId { get; set; }

    public string Role { get; set; } = "User";
    
    
}

