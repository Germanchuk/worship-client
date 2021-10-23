import axios from "axios";


const baseURL = process.env.REACT_APP_API_BASE_URL;


const axiosApiInstance = axios.create({
	baseURL
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
	async config => {
		config.headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}

		return config;
	},
	error => {
		Promise.reject(error)
	});


export default axiosApiInstance;