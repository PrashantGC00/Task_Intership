using Dapper;
using Project.DTO;
using Project.Entities;
using System.Data;

namespace Project.Repository
{
    public class ItemTrackingRepository : IItemTrackingRepository
    {
        private readonly IDbConnection _dbConnection;

        public ItemTrackingRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public IEnumerable<ItemTrackingDTO> GetItems() 
        {
            try
            {
                string query = "SELECT * FROM employee_items_tracking";
                var data = _dbConnection.Query<ItemTrackingDTO>(query);
                if(data == null)
                {
                    return null;
                }

                return data;

            }catch(Exception ex)
            {
                return null;
            }
        }

        public bool Insert(List<ItemTracking> trackingInfo)
        {
            try
            {
                string query = "INSERT INTO employee_items_tracking (employee_id, date, item_id, quantity) VALUES (@EmployeeId, @Date, @ItemId, @Quantity)";

                foreach (var item in trackingInfo)
                {
                    var parameters = new
                    {
                        EmployeeId = item.EmployeeId,
                        Date = item.Date,
                        ItemId = item.ItemId,
                        Quantity = item.Quantity
                    };

                    int rowsAffected = _dbConnection.Execute(query, parameters);

                    if (rowsAffected <= 0)
                    {
                        return false;
                    }
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool Delete(int id)
        {
            try
            {
                string query = "DELETE from employee_items_tracking where id = @id";
                int rowsAffected = _dbConnection.Execute(query, new { id });

                return rowsAffected > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool Update(int id, ItemTracking itemInfo)
        {
            try
            {
                Console.WriteLine(itemInfo);
                string query = "Update employee_items_tracking SET employee_id = @Employee_Id, date = @Date, item_id = @Item_Id, quantity = @Quantity WHERE id = @id";
                var parameters = new
                {
                    Id = id,
                    employee_id = itemInfo.EmployeeId,
                    date = itemInfo.Date,
                    item_id = itemInfo.ItemId,
                    quantity = itemInfo.Quantity
                };
                
                int rowsAffected = _dbConnection.Execute(query, parameters);
                return rowsAffected > 0;
            }catch (Exception ex)
            {
                return false;
            }  
        }
    }
}
