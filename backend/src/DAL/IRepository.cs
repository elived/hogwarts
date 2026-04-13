using System.Collections.Generic;
using HogwartsHouses.Models.Types;

namespace HogwartsHouses.DAL
{
    public interface IRepository<T>
    {
        IEnumerable<T> GetAll();
        T? GetById(int id);

        IEnumerable<T> Add(int id, string name, HouseType house, int maxcapacity);
        T? Update(int id, string name, HouseType house, int maxcapacity);
        T? Delete(int id);
        IEnumerable<T> GetAvailableRooms();
        IEnumerable<T> GetRatSafeRooms(HouseType? house, bool onlyWithFreeSpace = false);
    }
}
