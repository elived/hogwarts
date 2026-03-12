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
                new Room { Id = 4, Name = "Bedroom 1", House = "Slytherin" },
                new Room { Id = 5, Name = "Bedroom 2", House = "Slytherin" },
               
            };
        }

        public IEnumerable<Room> GetAll()
        {
            return _rooms;
        }

        public IEnumerable<Room> CreateRoom(int id, string name, string house)
        {
            var newRoom = new Room { Id = id, Name = name, House = house };
            _rooms.Add(newRoom);
            return _rooms;
        } 
    }
}
