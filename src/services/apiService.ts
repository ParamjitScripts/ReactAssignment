import type { AxiosResponse } from 'axios'
import axiosClient from './axiosClient'

// Generic API service methods
class ApiService {
    /**
     * GET request
     */
    async get<T>(url: string, params?: Record<string, any>): Promise<T> {
        const response: AxiosResponse<T> = await axiosClient.get(url, { params })
        return response.data
    }

    /**
     * POST request
     */
    async post<T, D = any>(url: string, data?: D): Promise<T> {
        const response: AxiosResponse<T> = await axiosClient.post(url, data)
        return response.data
    }

    /**
     * PUT request
     */
    async put<T, D = any>(url: string, data?: D): Promise<T> {
        const response: AxiosResponse<T> = await axiosClient.put(url, data)
        return response.data
    }

    /**
     * PATCH request
     */
    async patch<T, D = any>(url: string, data?: D): Promise<T> {
        const response: AxiosResponse<T> = await axiosClient.patch(url, data)
        return response.data
    }

    /**
     * DELETE request
     */
    async delete<T>(url: string): Promise<T> {
        const response: AxiosResponse<T> = await axiosClient.delete(url)
        return response.data
    }
}

export default new ApiService()
