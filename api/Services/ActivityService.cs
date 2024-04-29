using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Add;
using api.DTOs.Get;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public interface IActivityService
    {
        Task<List<GetActivityDto>> GetActivities();

        Task<GetActivityDto> CompleteActivity(int id);

        Task<GetActivityDto> AddActivity(AddActivityDto activity);
    }
    public class ActivityService : IActivityService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ActivityService(IMapper mapper,DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<GetActivityDto>> GetActivities()
        {
            var activities = await _context.Activities.ToListAsync();
            return _mapper.Map<List<GetActivityDto>>(activities);
        }

        public async Task<GetActivityDto> CompleteActivity(int id)
        {
            var activity = await _context.Activities.FindAsync(id);
            if (activity != null)
            {
                activity.Status = Status.Complete;
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
                Description = activity.Description,
                Status = Status.Pending
            };

            // Add the new activity to the context and save changes
            _context.Activities.Add(newActivity);
            await _context.SaveChangesAsync();

            // Map the new activity to GetActivityDto using AutoMapper and return it
            return _mapper.Map<GetActivityDto>(newActivity);
        }

    }
}