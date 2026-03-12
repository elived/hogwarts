using System.Collections.Generic;
using HogwartsHouses.Models;

namespace HogwartsHouses.Services
{
    public interface IRoomService
    {
        public IEnumerable<Room> GetRooms();

        public Room? GetById(int id);

        public IEnumerable<Room> Add(int id, string name, string house);

        public Room? Delete(int id);
    }
}
