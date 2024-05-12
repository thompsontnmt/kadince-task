import { AddActivityDto, UpdateActivityDto, GetActivityDto } from "../../generated/api";
import requests from "./requests";

export const AxiosServices = {
  Activity: {
    updateActivityComplete: (id: number) =>
      requests.put<GetActivityDto>(`/api/activity/complete/${id}`, {}),
    addActivity: (body: AddActivityDto) =>
      requests.post<GetActivityDto>(`/api/activity`, body),
    updateActivity: (id: number, body: UpdateActivityDto) => requests.put<GetActivityDto>(`/api/activity/${id}`, body),
    deleteActivity: (id: number) => requests.del<any>(`/api/activity/${id}`),
    updateActivityUncomplete: (id: number) =>
      requests.put<GetActivityDto>(`/api/activity/uncomplete/${id}`, {}),
  },
  };
