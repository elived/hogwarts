using System.Collections.Generic;
using HogwartsHouses.Models;

namespace HogwartsHouses.Services
{
    public interface IRoomService
    {
        public IEnumerable<Room> GetRooms();
    }
}
