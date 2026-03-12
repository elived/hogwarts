using System;
using System.Collections.Generic;
using HogwartsHouses.Models;

namespace HogwartsHouses.DAL
{
    public class InMemoryRoomRepository : IRepository<Room>
    {
        private HashSet<Room> _rooms;

        public InMemoryRoomRepository()
        {
            SeedRooms();
        }

        private void SeedRooms()
        {
            _rooms = new HashSet<Room>
            {
                new Room { Id = 1, Name = "Bedroom 1", House = "Gryffindor" },
                new Room { Id = 2, Name = "Bedroom 2", House = "Gryffindor" },
                new Room { Id = 3, Name = "Common room", House = "Gryffindor" },
                new Room { Id = 4, Name = "Bedroom 1", House = "Slytherin" },
                new Room { Id = 5, Name = "Bedroom 2", House = "Slytherin" },
                new Room { Id = 6, Name = "Common room", House = "Slytherin" },
            };
        }

        public IEnumerable<Room> GetAll()
        {
            return _rooms;
        }
    }
}
