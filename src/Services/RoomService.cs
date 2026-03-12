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

        public Room? GetById(int id)
        {
            return _repository.GetById(id);
        }

        public IEnumerable<Room> Add(int id, string name, string house)
        {
            return _repository.Add(id, name, house);
        }

        public Room? Delete(int id)
        {
            return _repository.Delete(id);
        }
    }
}
