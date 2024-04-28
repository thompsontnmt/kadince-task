using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Get;
using api.Models;
using AutoMapper;

public class ActivityAutoMapperProfile : Profile
{
    public ActivityAutoMapperProfile()
    {
        CreateMap<Activity, GetActivityDto>().ReverseMap();
    }
}