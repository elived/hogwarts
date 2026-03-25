using Microsoft.AspNetCore.Identity;

namespace HogwartsHouses.Models;

public class Users : IdentityUser
{
    public string Name;
}