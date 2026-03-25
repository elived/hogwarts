using System;
using System.Collections.Generic;
using System.Linq; 
using HogwartsHouses.Models;
using HogwartsHouses.Models.Types;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.CodeAnalysis.CSharp.Syntax;

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
                new Room { Id = 1, Name = "Bedroom 1", House = HouseType.Gryffindor, MaxCapacity = 4},
                new Room { Id = 2, Name = "Bedroom 2", House = HouseType.Gryffindor, MaxCapacity = 2},
                new Room { Id = 4, Name = "Bedroom 1", House = HouseType.Slytherin, MaxCapacity = 4},
                new Room { Id = 5, Name = "Bedroom 2", House = HouseType.Slytherin, MaxCapacity = 2},
               
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

        public IEnumerable<Room> Add(int id, string name, HouseType house, int Maxcapacity)
        {
            var newRoom = new Room { Id = id, Name = name, House = house, MaxCapacity = Maxcapacity};
            _rooms.Add(newRoom);
            return _rooms;
        }

        public Room? Update(int id, string name, HouseType house, int maxCapacity)
        {
            if (id <= 0) throw new ArgumentException("ID must be positive", nameof(id));
            
            var updateRoom = _rooms.FirstOrDefault(r => r.Id == id);
            if (updateRoom == null) return null;
            _rooms.Remove(updateRoom);
            
            updateRoom = new Room { Id = id, Name = name, House = house, MaxCapacity = maxCapacity };

            _rooms.Add(updateRoom);
            return updateRoom;
        }

        public Room? Delete(int id)
        {
            if (id <= 0) throw new ArgumentNullException(nameof(id), "ID must be positive.");
            var removed = _rooms.FirstOrDefault(r => r.Id == id);
            if (removed == null)
            {
                return null;

            }

            _rooms.Remove(removed);
            return removed;
        }

        public IEnumerable<Room> GetAvailableRooms()
        {
            return _rooms.Where(r => r.Students.Count < r.MaxCapacity);
        }

        public IEnumerable<Room> GetRatSafeRooms(HouseType? house, bool onlyWithFreeSpace = false)
        {
            var safe = _rooms.Where(r => r.Students.All(s => s.Pet != PetType.Cat && s.Pet != PetType.Owl));

            if (house.HasValue)
            {
                safe = safe.Where(r => r.House == house.Value);
            }
            
            if (onlyWithFreeSpace)
                safe = safe.Where(r => r.Students.Count < r.MaxCapacity);

            return safe;
        }
    }
}
