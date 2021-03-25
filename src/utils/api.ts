import { AxiosRequestConfig } from 'axios';
import AxiosConfig from '../config/axiosConfig';

export const postHttp = (
  url: string,
  data: any,
  config?: AxiosRequestConfig
) => {
  return AxiosConfig.post(url, data, config);
};
