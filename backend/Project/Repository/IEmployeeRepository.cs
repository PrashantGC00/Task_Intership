using Project.Entities;

public interface IEmployeeRepository
{
    IEnumerable<Employee> GetEmployees();
    bool Add(Employee employee);
    bool Delete(int id);
    Employee GetById(int id);
    bool Update(Employee employee);
}
