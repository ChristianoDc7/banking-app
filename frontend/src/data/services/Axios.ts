import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { RUNTIME_COOKIE_KEYS, deleteTokenCookie, getTokenCookie } from './AuthCookies';
import { PageRoutes } from '../../config/PageRoutes';
import Cookies from 'js-cookie'

const backendApiUrl = "http://localhost:3000"

// Create a new Axios instance with custom configurations
const HttpModule: AxiosInstance = axios.create({
	baseURL: backendApiUrl,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${getTokenCookie()}`,
	},
});

// Add a request interceptor to modify the request and check for token
HttpModule.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
	const token = getTokenCookie();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Add a response interceptor to modify the response data
HttpModule.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	async (error) => {
		// If the access token has expired, redirect to login
		if (error.response.status === 499 && error.response.data.code === 'TOKEN_EXPIRED') {
			Cookies.remove(RUNTIME_COOKIE_KEYS)
			deleteTokenCookie();
			window.location.href = PageRoutes.LOGIN;
		}
		return Promise.reject(error);
	},
);

export default HttpModule;