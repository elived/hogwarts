using System.Collections.Generic;
using HogwartsHouses.Models;
using HogwartsHouses.Models.Types;

namespace HogwartsHouses.Services
{
    public interface IRoomService
    {
        public IEnumerable<Room> GetRooms();

        public Room? GetById(int id);

        public IEnumerable<Room> Add(int id, string name, HouseType house);

        public Room? Update(int id, string name, HouseType house);

        public Room? Delete(int id);
        public IEnumerable<Room> GetAvailableRooms();

        public IEnumerable<Room> GetRatSafeRooms(HouseType? house, bool onlyWithFreeSpace = false);
    }
}
