import { AxiosRequestConfig } from 'axios';
import AxiosConfig from '../config/axiosConfig';

export const postHttp = (
  url: string,
  data: any,
  config?: AxiosRequestConfig
) => {
  return AxiosConfig.post(url, data, config);
};

export const getHttpRequest = (url: string, config?: AxiosRequestConfig) => {
  return AxiosConfig.get(url, config);
};
