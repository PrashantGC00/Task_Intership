using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Project.Entities
{
    public class ItemTracking
    {
        public int EmployeeId { get; set; }
        public string Date { get; set; }
        public int ItemId { get; set; }
        public int Quantity { get; set; }
    }
}
