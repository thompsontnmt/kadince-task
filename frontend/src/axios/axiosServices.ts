import { GetActivityDto } from "../../generated";
import requests from "./requests";

export const AxiosServices = {
  Activity: {
    putActivityComplete: (id: number) =>
      requests.put<GetActivityDto>(`/api/activity/complete/${id}`, {}),
  },
};
