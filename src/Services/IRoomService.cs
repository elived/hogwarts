using System.Collections.Generic;
using System.Threading.Tasks;
using HogwartsHouses.Models;
using HogwartsHouses.Models.Types;

namespace HogwartsHouses.Services
{
    public interface IRoomService
    {
        Task<IEnumerable<Room>> GetRooms();

        Task <Room?> GetById(int id);

        Task <IEnumerable<Room>> Add(int id, string name, HouseType house, int maxCapacity);

        Task <Room?> Update(int id, string name, HouseType house, int maxCapacity);

        Task <Room?> Delete(int id);
        Task <IEnumerable<Room>> GetAvailableRooms();

        Task <IEnumerable<Room>> GetRatSafeRooms(HouseType? house, bool onlyWithFreeSpace = false);
    }
}
