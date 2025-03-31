using Project.DTO;
using Project.Entities;

namespace Project.Services
{
    public interface IEmployeeServices
    {
        IEnumerable<Employee> GetEmployees();
        bool AddEmployee(EmployeeDTO employee);
        bool DeleteEmployee(int id);
        bool UpdateEmployee(int id, EmployeeDTO employee);

    }
}
