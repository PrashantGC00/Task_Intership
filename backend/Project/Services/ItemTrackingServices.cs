using Project.DTO;
using Project.Entities;
using Project.Repository;

namespace Project.Services
{
    public class ItemTrackingServices : IItemTrackingServices
    {
        private readonly IItemTrackingRepository _repository;
        public ItemTrackingServices(IItemTrackingRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<ItemTrackingDTO> GetEmployeeItems()
        {
            try
            {
                var data = _repository.GetItems();
                return data;
            }
            catch(Exception ex)
            {
                return null;
            }
        }

        public bool InsertEmployeeItems(List<ItemTracking> employeeItems)
        {
            try
            {
                return _repository.Insert(employeeItems);
            }catch(Exception ex)
            {
                return false;
            }
        }

        public bool DeleteEmployeeItems(int id)
        {
            try
            {
                return _repository.Delete(id);
            }catch(Exception ex)
            {
                return false;
            }
        }

        public bool UpdateEmployeeItems(int id, ItemTracking itemInfo)
        {
            try
            {
                return _repository.Update(id, itemInfo);
            }catch (Exception ex)
            {
                return false;
            }
        }
    }
}
