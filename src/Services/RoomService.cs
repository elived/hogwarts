using System.Collections.Generic;
using HogwartsHouses.DAL;
using HogwartsHouses.Models;

namespace HogwartsHouses.Services
{
    public class RoomService : IRoomService
    {
        private IRepository<Room> _repository { get; }

        public RoomService(IRepository<Room> repository)
        {
            _repository = repository;
        }

        public IEnumerable<Room> GetRooms()
        {
            return _repository.GetAll();
        }

        public IEnumerable<Room> CreateRoom(int id, string name, string house)
        {
            return _repository.CreateRoom(id, name, house);
        }
    }
}
