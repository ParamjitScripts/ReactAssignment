import axios, { AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { API_BASE_URL } from '../constants/appConstants'

// Create Axios instance
const axiosClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request Interceptor
axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Log request details in development
        if (import.meta.env.MODE === 'development') {
            console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
                params: config.params,
                data: config.data,
            })
        }

        // Add authentication token if available
        const token = localStorage.getItem('authToken')
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error: AxiosError) => {
        // Handle request error
        console.error('[API Request Error]', error)
        return Promise.reject(error)
    }
)

// Response Interceptor
axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // Log response in development
        if (import.meta.env.MODE === 'development') {
            console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
                status: response.status,
                data: response.data,
            })
        }

        return response
    },
    (error: AxiosError) => {
        // Handle response errors
        if (error.response) {
            // Server responded with error status
            const status = error.response.status
            const message = error.response.data || error.message

            console.error(`[API Error ${status}]`, {
                url: error.config?.url,
                method: error.config?.method,
                status,
                message,
            })

            // Handle specific status codes
            switch (status) {
                case 401:
                    // Unauthorized - clear token and redirect to login
                    localStorage.removeItem('authToken')
                    // You can add navigation logic here
                    console.warn('Session expired. Please login again.')
                    break

                case 403:
                    // Forbidden
                    console.error('Access forbidden')
                    break

                case 404:
                    // Not found
                    console.error('Resource not found')
                    break

                case 500:
                    // Internal server error
                    console.error('Internal server error')
                    break

                default:
                    console.error('An error occurred')
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error('[API Network Error]', 'No response received from server')
        } else {
            // Something happened in setting up the request
            console.error('[API Setup Error]', error.message)
        }

        return Promise.reject(error)
    }
)

export default axiosClient
