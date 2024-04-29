import { GetActivityDto } from "../../generated";
import { AddActivityDto } from "../../generated/api";
import requests from "./requests";

export const AxiosServices = {
  Activity: {
    putActivityComplete: (id: number) =>
      requests.put<GetActivityDto>(`/api/activity/complete/${id}`, {}),
    addActivity: (body: AddActivityDto) =>
      requests.post<GetActivityDto>(`/api/activity`, body),
  },
};
