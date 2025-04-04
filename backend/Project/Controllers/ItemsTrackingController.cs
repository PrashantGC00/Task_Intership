using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.Entities;
using Project.Repository;
using Project.Services;

namespace Project.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsTrackingController : ControllerBase
    {

        private readonly IItemTrackingServices _service;
        public ItemsTrackingController(IItemTrackingServices service)
        {
            _service = service;
        }

        [AllowAnonymous]
        [HttpGet]       
        public IActionResult Get()
        {
            try
            {
                var data = _service.GetEmployeeItems();
                if(data == null)
                {
                    return Ok(new { message = "No Items Registered" });
                }

                return Ok(new { data });
            }
            catch(Exception ex)
            {
                return StatusCode(500, new {message = "Server Error"});
            }
        }

        [HttpPost]
        [Route("insert-items-employee")]
        public IActionResult InsertItems([FromBody] List<ItemTracking> itemsList)
        {
            try
            {
                bool isInserted = _service.InsertEmployeeItems(itemsList);

                if (!isInserted)
                {
                    return BadRequest(new { message = "Insertion Failed" });
                }

                return Ok(new { message = "Items Inserted Successfully" });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.ToString());
                return StatusCode(500, new { message = "Server Error", error = ex.Message });
            }
        }

        [HttpDelete]
        [Route("delete-items-employee/{id}")]
        public IActionResult DeleteEmployeeItems(int id)
        {
            try
            {
                bool iisDeleted = _service.DeleteEmployeeItems(id);

                if (!iisDeleted)
                {
                    return BadRequest(new { messagae = "Could not Delete Item." });
                }
                return Ok(new { message = "Item Deleted" });
            }catch(Exception ex)
            {
                return StatusCode(500, new { message = "Server Error" });
            }
        }

        [AllowAnonymous]
        [HttpPut]
        [Route("update-items-employee/{id}")]
        public IActionResult UpdateEmployeeItem([FromRoute] int id, [FromBody] ItemTracking itemsInfo)
        {
            try
            {
                bool isUpdated = _service.UpdateEmployeeItems(id, itemsInfo);

                if (!isUpdated)
                {
                    return BadRequest(new { message = "Error Updating List" });
                }
                return Ok(new { message = "List Updated" });
            }
            catch
            {
                return StatusCode(500, new { message = "Server Error" });
            }
        }
    }
}
