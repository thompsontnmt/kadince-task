using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Get;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public interface IActivityService
    {
        Task<List<GetActivityDto>> GetActivities();
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
    }
}