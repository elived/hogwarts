using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace HogwartsHouses.Models;

public class User : IdentityUser
{
    public string Id { get; set; }

    public int RoleId { get; set; }

    public string Role { get; set; } = "User";
    
    public Student? Student { get; set; } // optional

     public User()
     {
     }
    
}

     