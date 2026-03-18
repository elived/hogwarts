using System.Collections.Generic;
using HogwartsHouses.Models.Types;

namespace HogwartsHouses.Models
{
    [System.Serializable]
    public class Room
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public HouseType House { get; set; }
        public int maxCapacity { get; set; }
        
        public List<Student> Students { get; set; } = new();
    }
}
