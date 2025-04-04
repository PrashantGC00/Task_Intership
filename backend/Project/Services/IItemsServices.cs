using Project.Entities;

namespace Project.Services
{
    public interface IItemsServices
    {
        IEnumerable<Items> GetItems();
    }
}
