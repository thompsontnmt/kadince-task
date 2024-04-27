using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivityController : ControllerBase
    {
        [HttpGet]

        public async Task<IActionResult> GetActivity()
        {
            var activities = new List<Activity>()
            {
                new Activity
                {
                    Id = 1,
                    Title = "Activity",
                    Description = "Activity description",
                    DueDate = DateTime.Now
                }
            };
            return Ok(activities);
        }
    }
}