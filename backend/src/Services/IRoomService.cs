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

        Task<Room> AddRoom(CreateRoomRequest request);

        Task <Room?> Update(int id, string name, HouseType house, int maxCapacity);

        Task <Room?> Delete(int id);
       
    }
}
