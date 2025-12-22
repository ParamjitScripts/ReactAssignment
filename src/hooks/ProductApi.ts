import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { API_BASE_URL } from '../constants/appConstants'
import type { IServerResponse } from '../types/IServerResponse'
import type { IProduct, ProductQueryParams } from '../types/IProduct'

const fetchProducts = async (params: ProductQueryParams): Promise<IServerResponse<IProduct[]>> => {
    const searchParams = new URLSearchParams()
    if (params.search) searchParams.set('search', params.search)
    if (params.name) searchParams.set('name', params.name)
    const url = `${API_BASE_URL}products${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error('Failed to fetch product')
    }
    return response.json() as Promise<IServerResponse<IProduct[]>>
}

export const getProducts = (
    params: ProductQueryParams = {},
): UseQueryResult<IServerResponse<IProduct[]>, Error> => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => fetchProducts(params),
    })
}