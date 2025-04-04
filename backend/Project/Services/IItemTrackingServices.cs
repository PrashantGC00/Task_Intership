using Project.DTO;
using Project.Entities;

namespace Project.Services
{
    public interface IItemTrackingServices
    {
        IEnumerable<ItemTrackingDTO> GetEmployeeItems();
        bool InsertEmployeeItems(List<ItemTracking> employeeItems);
        bool DeleteEmployeeItems(int id);
        bool UpdateEmployeeItems(int id, ItemTracking itemInfo);
    }
}
