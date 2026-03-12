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
            _rooms = new HashSet<Room>();
            throw new NotImplementedException();
        }
    }
}
