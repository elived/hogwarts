using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HogwartsHouses.Data;
using HogwartsHouses.Models;
using HogwartsHouses.Models.Types;
using Microsoft.EntityFrameworkCore;

namespace HogwartsHouses.Services
{
    public class RoomService : IRoomService
    {
        private readonly AppDbContext _db;

        public RoomService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Room>> GetRooms()
        {
            return await _db.Rooms
            .Include(r => r.Students)
            .ToListAsync();
        }

        public async Task<Room?> GetById(int id)
        {
            return await _db.Rooms
                .Include(r => r.Students)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        
        public async Task<Room> AddRoom(CreateRoomRequest request)
        {
            
            var room = new Room
            {
                Name = request.Name,
                House = request.House,
                MaxCapacity = request.MaxCapacity
            };
            _db.Rooms.Add(room);
            await _db.SaveChangesAsync();


            return room;
        }
         

        public async Task<Room?> Update(int id, string name, HouseType house, int maxCapacity)
        {
            var room = await _db.Rooms.FindAsync(id);
            if (room == null) return null;

            room.Name = name;
            room.House = house;
            room.MaxCapacity = maxCapacity;
            
            await _db.SaveChangesAsync();
            return room;
        }

        public async Task<Room?> Delete(int id)
        {
            var room = await _db.Rooms.FindAsync(id);
            if (room == null) return null;

            _db.Rooms.Remove(room);
            await _db.SaveChangesAsync();
            return room;
        }

    }
}
