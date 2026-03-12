using System.Collections.Generic;

namespace HogwartsHouses.DAL
{
    public interface IRepository<T>
    {
        IEnumerable<T> GetAll();

        IEnumerable<T> CreateRoom(int id, string name, string house);
    }
}
