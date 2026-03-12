using System.Collections.Generic;
using HogwartsHouses.Models;

namespace HogwartsHouses.Services
{
    public interface IRoomService
    {
        public IEnumerable<Room> GetRooms();

        public IEnumerable<Room> CreateRoom(int id, string name, string house);
    }
}
