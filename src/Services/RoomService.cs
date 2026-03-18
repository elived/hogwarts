using System.Collections.Generic;
using System.Linq;
using HogwartsHouses.DAL;
using HogwartsHouses.Models;
using HogwartsHouses.Models.Types;

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

        public IEnumerable<Room> Add(int id, string name, HouseType house)
        {
            return _repository.Add(id, name, house);
        }

        public Room? Update(int id, string name, HouseType house)
        {
            return _repository.Update(id, name, house);
        }

        public Room? Delete(int id)
        {
            return _repository.Delete(id);
        }

        public IEnumerable<Room> GetAvailableRooms()
        {
            return _repository.GetAvailableRooms();
        }

        public IEnumerable<Room> GetRatSafeRooms(HouseType? house, bool onlyWithFreeSpace = false)
        {
            if (_repository is InMemoryRoomRepository concrete)
                return concrete.GetRatSafeRooms(house, onlyWithFreeSpace);
            
            var all = _repository.GetAll();
            var safe = all.Where(r => r.Students.All(s => s.Pet != PetType.Cat && s.Pet != PetType.Owl));

            if (house.HasValue) safe = safe.Where(r => r.House == house.Value);
            if (onlyWithFreeSpace) safe = safe.Where(r => r.Students.Count < r.maxCapacity);

            return safe;
        }
    }
}
