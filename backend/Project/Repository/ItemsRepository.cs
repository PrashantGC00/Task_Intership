using Dapper;
using Project.Entities;
using System.Data;

namespace Project.Repository
{
    public class ItemsRepository : IItemsRepository
    {
        private readonly IDbConnection _dbConnection;

        public ItemsRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public IEnumerable<Items> GetItems()
        {
            try
            {
                string query = "SELECT * FROM items";
                return _dbConnection.Query<Items>(query);
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<Items>();
            }
        }
    }
}
