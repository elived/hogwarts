using System.Text.Json.Serialization;
using HogwartsHouses.Models.Types;

namespace HogwartsHouses.Models
{
    [System.Serializable]
    public class Student
    {
        public required int Id { get; set; }
        public required string Name { get; set; }
        public required HouseType House { get; set; }
        public required PetType Pet { get; set; }
        
        public required int RoomId { get; set; }
        [JsonIgnore]  
        public Room Room { get; set; }      
    }
}
