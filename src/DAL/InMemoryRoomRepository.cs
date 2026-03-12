using System;
using System.Collections.Generic;
using System.Linq; 
using HogwartsHouses.Models;
using Microsoft.AspNetCore.Http.HttpResults;

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
        
        public Room? GetById(int id)
        {

            if (id <= 0) throw new ArgumentOutOfRangeException(nameof(id), "ID must be positive.");
            return _rooms.FirstOrDefault(r => r.Id == id);
        }

        public IEnumerable<Room> Add(int id, string name, string house)
        {
            var newRoom = new Room { Id = id, Name = name, House = house };
            _rooms.Add(newRoom);
            return _rooms;
        }


    }
}
