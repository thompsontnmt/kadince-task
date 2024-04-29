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

        public async Task<ActionResult<GetActivityDto>> GetActivities()
        {
            return Ok(await _activityService.GetActivities());
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

        public async Task<ActionResult> UpdateActivity(int id, UpdateActivityDto activity)
        {
            var updatedActivity = await _activityService.UpdateActivity(id, activity);
            if (updatedActivity == null)
            {
                return NotFound("Activity not found");
            }
            return Ok(updatedActivity);
        }

        [HttpDelete]
        public async Task<ActionResult<Activity>> DeleteActivity(int id)
        {
            var dbActivity = await _context.Activities.FindAsync(id);
            if (dbActivity is null)
                return NotFound("Activity not found");

            _context.Activities.Remove(dbActivity);
            await _context.SaveChangesAsync();

            return Ok(await _context.Activities.ToListAsync());
        }
    }
}