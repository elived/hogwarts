using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace HogwartsHouses.Models;

public class User : IdentityUser
{
    public int Id { get; set; }

    public int RoleId { get; set; }

    public string Role { get; set; } = "user";
    
    public Student? Student { get; set; } // optional

     public User()
     {
     }
    
}

     