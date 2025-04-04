using Project.Entities;
using Project.Repository;

namespace Project.Services
{
    public class ItemsServices : IItemsServices
    {
        private readonly IItemsRepository _repository;

        public ItemsServices(IItemsRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<Items> GetItems()
        {
            try
            {
                var items = _repository.GetItems();
                return items;
            }
            catch(Exception ex)
            {
                return null;
            }
        }
    }
}
