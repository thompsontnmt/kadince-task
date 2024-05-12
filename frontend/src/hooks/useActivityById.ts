import useSWR from "swr";
import { SWRFetcher } from "./_swrConfigs";
import { GetActivityDto } from "../../generated/api";
import requests from "../axios/requests";

export const swrActivityByIdKey = (id: number) => `api/activity/${id}`;

export const useActivityById = (id: number | undefined) => useSWR(
    () => (id ? swrActivityByIdKey(id) : null),
    fetchActivityById
);

const fetchActivityById: SWRFetcher<GetActivityDto> = async (url) => {
    const response = await requests.get<GetActivityDto>(`${url}`);
    return response.data
}