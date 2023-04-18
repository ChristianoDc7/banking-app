import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Cookies } from 'react-cookie';


const backendApiUrl = "http://localhost:3000"

// Create a new Axios instance with custom configurations
const HttpModule: AxiosInstance = axios.create({
  baseURL: backendApiUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

// Add a response interceptor to modify the response data
HttpModule.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {

    // If the access token has expired, redirect to login
    if (error.response.status === 401 && error.response.data.code === 'TOKEN_EXPIRED') {
        window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);

export default HttpModule;