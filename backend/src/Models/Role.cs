using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HogwartsHouses.Models;

public class Role
{
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; }

    public ICollection<User> Users { get; set; } = new List<User>();

    public Role()
    {
    } 
}