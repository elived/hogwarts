using System.Collections.Generic;
using HogwartsHouses.Models.Types;

namespace HogwartsHouses.Models
{
    [System.Serializable]
    public class Room
    {
        public required int Id { get; set; }
        public required string Name { get; set; }
        public required HouseType House { get; set; }
        public required int MaxCapacity { get; set; }
        
        public List<Student> Students { get; set; } = new();
    }
}
