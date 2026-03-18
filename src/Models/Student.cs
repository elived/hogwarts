using System.Text.Json.Serialization;
using HogwartsHouses.Models.Types;

namespace HogwartsHouses.Models
{
    [System.Serializable]
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public HouseType House { get; set; }
        public PetType Pet { get; set; }
        
        public int RoomId { get; set; }
        [JsonIgnore]  
        public Room Room { get; set; }      
    }
}
