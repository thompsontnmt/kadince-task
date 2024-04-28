// Type for SWR fetcher function
export type SWRFetcher<T> = (...args: any[]) => Promise<T>;
