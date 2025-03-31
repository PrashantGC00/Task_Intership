using Dapper;
using Npgsql;
using System.Data;
using System.Collections.Generic;
using Project.Entities;

namespace Project.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly IDbConnection _dbConnection;

        public EmployeeRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public IEnumerable<Employee> GetEmployees()
        {
            try
            {
                string query = "SELECT * FROM employees";
                return _dbConnection.Query<Employee>(query);
            }catch (Exception ex)
            {
                return Enumerable.Empty<Employee>();
            }

        }

        public bool Add(Employee employee)
        {
            try
            {
                string query = "INSERT INTO employees (name, email, contact, status) VALUES (@Name, @Email, @Contact, @Status)";
                int rowsAffected = _dbConnection.Execute(query, employee);
                return (rowsAffected > 0);

            }catch(Exception ex)
            {
                return false;
            }
        }

        public bool Delete(int id)
        {
            try
            {
                string query = "DELETE FROM employees WHERE id = @Id";
                int rowsAffected = _dbConnection.Execute(query, new { Id = id });

                return rowsAffected > 0;

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public Employee GetById(int id)
        {
            try
            {
                string query = "SELECT * FROM employees WHERE id = @Id";
                return _dbConnection.QueryFirstOrDefault<Employee>(query, new { Id = id });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching employee by ID: {ex.Message}");
                return null;
            }
        }
        public bool Update(Employee employee)
        {
            try
            {
                string query = "UPDATE employees SET name = @Name, email = @Email, contact = @Contact, status = @Status WHERE id = @Id";
                int rowsAffected = _dbConnection.Execute(query, employee);
                return rowsAffected > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating employee: {ex.Message}");
                return false;
            }
        }
    }
}
