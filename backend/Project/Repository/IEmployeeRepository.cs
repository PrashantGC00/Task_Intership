using Project.Entities;

namespace Project.Repository
{
    public interface IEmployeeRepository
    {
        IEnumerable<Employee> GetEmployees();
        bool Add(Employee employee);
        bool Delete(int id);
        Employee GetById(int id);
        bool Update(Employee employee);
    }
}
