import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { RUNTIME_COOKIE_KEYS, deleteTokenCookie, getTokenCookie } from './AuthCookies';
import { PageRoutes } from '../../config/PageRoutes';
import Cookies from 'js-cookie'

const backendApiUrl = () => {
	const { NODE_ENV, VITE_BACKEND_PRODUCTION, VITE_BACKEND_DEVELOPMENT } = import.meta.env;
	if (NODE_ENV === 'production') {
		return VITE_BACKEND_PRODUCTION;
	} else {
		return VITE_BACKEND_DEVELOPMENT;
	}
}

// Create a new Axios instance with custom configurations
const HttpModule: AxiosInstance = axios.create({
	baseURL: backendApiUrl(),
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
		console.log(error.response)
		// If the access token has expired, redirect to login
		if (error.response.status === 499) {
			Cookies.remove(RUNTIME_COOKIE_KEYS)
			deleteTokenCookie();
			window.location.href = PageRoutes.LOGIN;
		}
		return Promise.reject(error);
	},
);

export default HttpModule;