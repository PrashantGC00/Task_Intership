using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.Entities;
using Project.Repository;
using Project.Services;

namespace Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemsServices _services;
        public ItemsController(IItemsServices services)
        {
            _services = services;
        }

        [HttpGet]
        [Route("get-items")]
        public IActionResult Items()
        {
            try
            {
                var items = _services.GetItems();

                if (items == null)
                {
                    return Ok(new { message = "Empty table" });
                }
                return Ok(new { data = items });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Server Error" });
            }
        }
    }
}
