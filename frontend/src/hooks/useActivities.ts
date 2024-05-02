import useSWR from 'swr';
import { GetActivityDto } from '../../generated/api';
import requests from '../axios/requests';


const fetchActivities = async (url: string): Promise<GetActivityDto[]> => {
  const response = await requests.get<GetActivityDto[]>(url);
  return response.data;
};

export const useActivities = (isComplete?: boolean | null) => {
  const queryString = isComplete === null ? '' : `?isComplete=${isComplete}`;
  return useSWR(`/api/activity${queryString}`, fetchActivities);
};
