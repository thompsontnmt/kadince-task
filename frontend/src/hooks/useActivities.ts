import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { GetActivityDto } from '../../generated/api';
import requests from '../axios/requests';

const fetchActivities = async (url: string): Promise<GetActivityDto[]> => {
  const response = await requests.get<GetActivityDto[]>(url);
  return response.data;
};

export const useActivities = (isComplete?: boolean | null, sortOrder: string = 'desc') => {
  const [firstLoad, setFirstLoad] = useState(true);  // State to track the first load

  let queryString = '?';
  if (isComplete !== null) {
    queryString += `isComplete=${isComplete}`;
  }
  queryString += `&sortOrder=${sortOrder}`;

  const swrOptions = {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: firstLoad  // Only revalidate on mount for the first load
  };

  const { data, error, mutate, isLoading } = useSWR(`/api/activity${queryString}`, fetchActivities, swrOptions);

  useEffect(() => {
    if (data && firstLoad) {
      setFirstLoad(false);  // Set firstLoad to false after the first successful fetch
    }
  }, [data]);

  const updateActivityInCache = (updatedActivity: GetActivityDto) => {
    mutate((currentActivities: GetActivityDto[] = []) =>
      currentActivities.map(activity =>
        activity.id === updatedActivity.id ? updatedActivity : activity
      ), false); // No re-fetching from the server
  };

  const addActivityToCache = (newActivity: GetActivityDto) => {
    mutate((currentActivities: GetActivityDto[] = []) => {
      const sortedActivities = [...currentActivities, newActivity];
      sortedActivities.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
      return sortedActivities;
    }, false);
  };

  const removeActivityFromCache = (id: number) => {
    mutate((activities: GetActivityDto[] = []) => activities.filter(activity => activity.id !== id), false);
  };

  return {
    activities: data,
    error,
    updateActivityInCache,
    addActivityToCache,
    removeActivityFromCache,
    isLoading
  };
};
