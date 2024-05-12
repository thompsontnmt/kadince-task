using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Add;
using api.DTOs.Get;
using api.DTOs.Update;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ActivityController : ControllerBase
    {
        private readonly IActivityService _activityService;
        private readonly DataContext _context;

        public ActivityController(IActivityService activityService)
        {
            // _context = context;
            _activityService = activityService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GetActivityDto>>> GetActivities([FromQuery] bool? isComplete, [FromQuery] string sortOrder = "asc")
        {
            var activities = await _activityService.GetActivities(isComplete, sortOrder);
            return Ok(activities);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetActivityDto>> GetActivityById(int id)
        {
            try
            {
                var activity = await _activityService.GetActivity(id);
                return Ok(activity);
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Activity with ID {id} not found.");
            }
        }

        [HttpPut("Complete/{id}")]
        public async Task<ActionResult<GetActivityDto>> CompleteActivity(int id)
        {
           return Ok(await _activityService.CompleteActivity(id));
        }

        [HttpPost]
        public async Task<ActionResult<GetActivityDto>> AddActivity(AddActivityDto activity)
        {
            var addedActivity = await _activityService.AddActivity(activity);
            return Ok(addedActivity);
        }

        [HttpPut("{id}")]

        public async Task<ActionResult<GetActivityDto>> UpdateActivity(int id, UpdateActivityDto activity)
        {
            var updatedActivity = await _activityService.UpdateActivity(id, activity);
            if (updatedActivity == null)
            {
                return NotFound("Activity not found");
            }
            return Ok(updatedActivity);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(int id)
        {
            await _activityService.DeleteActivity(id);
            return Ok();
        }

        [HttpPut("Uncomplete/{id}")]
        public async Task<ActionResult<GetActivityDto>> UncompleteActivity(int id)
        {
            try
            {
                var activity = await _activityService.UncompleteActivity(id);
                return Ok(activity);
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Activity with ID {id} not found.");
            }
        }
    }
}