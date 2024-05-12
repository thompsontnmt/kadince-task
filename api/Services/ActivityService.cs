using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Add;
using api.DTOs.Get;
using api.DTOs.Update;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public interface IActivityService
    {
        Task<List<GetActivityDto>> GetActivities(bool? isComplete = null, string sortOrder = "asc");

        Task<GetActivityDto> GetActivity(int id);

        Task<GetActivityDto> CompleteActivity(int id);

        Task<GetActivityDto> AddActivity(AddActivityDto activity);

        Task<GetActivityDto> UpdateActivity(int id, UpdateActivityDto activity);

        Task DeleteActivity(int id);

        Task<GetActivityDto> UncompleteActivity(int id);

    }
    public class ActivityService : IActivityService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ActivityService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }
      public async Task<List<GetActivityDto>> GetActivities(bool? isComplete = null, string sortOrder = "asc")
    {
        IQueryable<Activity> query = _context.Activities;

        if (isComplete.HasValue)
        {
            query = query.Where(a => a.IsComplete == isComplete.Value);
        }

        // Apply sorting
        if (sortOrder.ToLower() == "desc")
        {
            query = query.OrderByDescending(a => a.CreatedOn);
        }
        else
        {
            query = query.OrderBy(a => a.CreatedOn);
        }

        var activities = await query.ToListAsync();
        return _mapper.Map<List<GetActivityDto>>(activities);
    }
         public async Task<GetActivityDto> GetActivity(int id)
    {
        var activity = await _context.Activities.FindAsync(id);
        if (activity == null)
        {
            throw new KeyNotFoundException("Activity not found");
        }
        return _mapper.Map<GetActivityDto>(activity);
    }

        public async Task<GetActivityDto> CompleteActivity(int id)
        {
            var activity = await _context.Activities.FindAsync(id);
            if (activity != null)
            {
                activity.IsComplete = true;
                await _context.SaveChangesAsync();
            }
            return _mapper.Map<GetActivityDto>(activity);
        }

        public async Task<GetActivityDto> AddActivity(AddActivityDto activity)
        {
            // Create a new Activity entity
            var newActivity = new Activity
            {
                Title = activity.Title,
                IsComplete = false
            };

            // Add the new activity to the context and save changes
            _context.Activities.Add(newActivity);
            await _context.SaveChangesAsync();

            // Map the new activity to GetActivityDto using AutoMapper and return it
            return _mapper.Map<GetActivityDto>(newActivity);
        }

        public async Task<GetActivityDto> UpdateActivity(int id, UpdateActivityDto activity)
        {
            // Retrieve the activity from the database
            var dbActivity = await _context.Activities.FindAsync(id);

            if (dbActivity != null)
            {
                // Update the activity's fields
                dbActivity.Title = activity.Title;
            }

            // Save changes to the database
            await _context.SaveChangesAsync();

            // Map the updated activity to GetActivityDto and return it
            return _mapper.Map<GetActivityDto>(dbActivity);
        }

        public async Task DeleteActivity(int id)
        {
            var activity = await _context.Activities.FindAsync(id);
            if (activity != null) {
            _context.Activities.Remove(activity);
            await _context.SaveChangesAsync();
            }
        }

        public async Task<GetActivityDto> UncompleteActivity(int id)
        {
            var activity = await _context.Activities.FindAsync(id);
            if (activity == null)
            {
                throw new KeyNotFoundException("Activity not found");
            }
            activity.IsComplete = false;
            await _context.SaveChangesAsync();
            return _mapper.Map<GetActivityDto>(activity);
        }


    }
}