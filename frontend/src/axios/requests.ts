import axios, { AxiosRequestConfig } from "axios";

const requests = {
  get: <T>(url: string, config?: AxiosRequestConfig<any>) =>
    axios.get<T>(url, config),
  post: <T>(url: string, body: any, config?: AxiosRequestConfig<any>) =>
    axios.post<T>(url, body, config),
  put: <T>(url: string, body: any, config?: AxiosRequestConfig<any>) =>
    axios.put<T>(url, body, config),
  del: <T>(url: string, config?: AxiosRequestConfig<{}>) =>
    axios.delete<T>(url, config),
};

export default requests;
