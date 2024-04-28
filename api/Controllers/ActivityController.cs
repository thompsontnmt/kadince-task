using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ActivityController : ControllerBase
    {
        private readonly DataContext _context;

        public ActivityController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]

        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            var activities = await _context.Activities.ToListAsync();
            return Ok(activities);
        }

        [HttpPut("Complete/{id}")]
        public async Task<ActionResult> CompleteActivity(int id)
        {
            var activity = await _context.Activities.FindAsync(id);
            if (activity == null)
                return NotFound("Activity not found");

            activity.Status = Status.Complete;

            await _context.SaveChangesAsync();

            return Ok(activity);
        }

        [HttpPost]

        public async Task<ActionResult<List<Activity>>> AddActivity(Activity activity)
        {
            _context.Activities.Add(activity);
            await _context.SaveChangesAsync();

            return Ok(await _context.Activities.ToListAsync());
        }

        [HttpPut("{id}")]

        public async Task<ActionResult> UpdateActivity(Activity updatedActivity)
        {
            var dbActivity = await _context.Activities.FindAsync(updatedActivity.Id);
            if (dbActivity is null)
            return NotFound("Activity not found");

            dbActivity.Title = updatedActivity.Title;
            dbActivity.Description = updatedActivity.Description;
            dbActivity.Status = updatedActivity.Status;

            await _context.SaveChangesAsync();

            return Ok(await _context.Activities.ToListAsync());
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