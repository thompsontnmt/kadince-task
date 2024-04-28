import useSWR from "swr";
import { SWRFetcher } from "./_swrConfigs";
import { GetActivityDto } from "../../generated/api";
import requests from "../axios/requests";

export const useActivities = () =>
  useSWR(
    {
      url: `/api/activity`,
    },
    fetchActivities
  );

const fetchActivities: SWRFetcher<GetActivityDto[]> = async ({ url }) => {
  const response = await requests.get<GetActivityDto[]>(`${url}`);
  return response.data;
};
