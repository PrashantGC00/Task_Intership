using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project.DTO;
using Project.Entities;
using Project.Services;

namespace Project.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeServices _employeeService;

        public EmployeeController(IEmployeeServices employeeService)
        {
            _employeeService = employeeService;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("get-employees")]
        public IActionResult GetEmployees()
        {
            try
            {
                var employees = _employeeService.GetEmployees();

                if (employees == null)
                {
                    return Ok(new { message = "Empty Table" });
                }
                return Ok(new { data = employees });
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("register-employee")]
        public IActionResult RegisterEmployee(EmployeeDTO employeeInfo)
        {
            try
            {
                var isRegistered = _employeeService.AddEmployee(employeeInfo);
                if (!isRegistered)
                {
                    return BadRequest();
                }
                return Ok(new { message = "Employee Added" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        [HttpDelete]
        [Route("delete-employee/{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            try
            {
                var isRemoved = _employeeService.DeleteEmployee(id);

                if (!isRemoved)
                {
                    return BadRequest(new { message = "Failed to delete employee" });
                }

                return Ok(new { message = "Employee Removed" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPut]
        [Route("update-employee/{id}")]
        public IActionResult UpdateEmployee(int id, [FromBody] EmployeeDTO employee)
        {
            try
            {
                var isUpdated = _employeeService.UpdateEmployee(id, employee);

                if (!isUpdated)
                {
                    return BadRequest(new { message = "Failed to update employee" });
                }

                return Ok(new { message = "Employee updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

    }
}
