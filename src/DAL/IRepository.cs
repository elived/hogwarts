using System.Collections.Generic;

namespace HogwartsHouses.DAL
{
    public interface IRepository<T>
    {
        IEnumerable<T> GetAll();
        T? GetById(int id);

        IEnumerable<T> Add(int id, string name, string house);
    }
}
