using HogwartsHouses.Models.Types;

public class CreateRoomRequest
{
    public string Name { get; set; } = null!;
    public HouseType House { get; set; }
    public int MaxCapacity { get; set; }
}