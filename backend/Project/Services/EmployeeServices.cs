using Microsoft.AspNetCore.Http.HttpResults;
using Project.DTO;
using Project.Entities;
using Project.Repository;

namespace Project.Services
{
    public class EmployeeServices : IEmployeeServices
    {
        private readonly IEmployeeRepository _employeeRepo;

        public EmployeeServices(IEmployeeRepository employeeRepo)
        {
            _employeeRepo = employeeRepo;
        }
        public IEnumerable<Employee> GetEmployees()
        {
            try
            {
                var employees = _employeeRepo.GetEmployees();
                if(employees == null)
                {
                    return null;
                }

                return employees;
            }
            catch(Exception ex)
            {
                return null;
            }
        }

        public bool AddEmployee(EmployeeDTO employee)
        {
            try
            {
                var newEmployee = new Employee
                {
                    Name = employee.Name,
                    Email = employee.Email,
                    Contact = employee.Contact,
                    Status = employee.Status
                };

                return _employeeRepo.Add(newEmployee);

            }
            catch(Exception ex)
            {
                return false;
            }

        }

        public bool DeleteEmployee(int id)
        {
            try
            {
                return _employeeRepo.Delete(id);

            }catch(Exception ex)
            {
                return false;
            }
        }

        public bool UpdateEmployee(int id, EmployeeDTO employee)
        {
            try
            {
 
                var existingEmployee = _employeeRepo.GetById(id);
                if (existingEmployee == null)
                {
                    return false;
                }

                existingEmployee.Name = employee.Name;
                existingEmployee.Email = employee.Email;
                existingEmployee.Contact = employee.Contact;
                existingEmployee.Status = employee.Status;

                return _employeeRepo.Update(existingEmployee);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating employee: {ex.Message}");
                return false;
            }
        }
    }
}
