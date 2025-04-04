using Project.Entities;

namespace Project.Repository
{
    public interface IItemsRepository
    {
        IEnumerable<Items> GetItems();
    }
}
