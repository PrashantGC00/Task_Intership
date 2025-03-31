using System.ComponentModel.DataAnnotations;

namespace Project.DTO
{
    public class EmployeeDTO
    {
        public required string Name { get; set; }

        [RegularExpression("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]
        public required string Email { get; set; }
        public required string Contact { get; set; }

        public required string Status { get; set; }
    }
}
