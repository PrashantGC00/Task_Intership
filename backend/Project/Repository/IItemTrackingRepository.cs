using Project.DTO;
using Project.Entities;

namespace Project.Repository
{
    public interface IItemTrackingRepository
    {
        IEnumerable<ItemTrackingDTO> GetItems();
        bool Insert(List<ItemTracking> trackingInfo);
        bool Delete(int id);
        bool Update(int id, ItemTracking itemInfo);
    }
}
