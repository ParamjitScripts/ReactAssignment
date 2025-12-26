import { useQuery, useMutation, useQueryClient, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query'
import type { IServerResponse } from '../types/IServerResponse'
import type { IProduct, ProductQueryParams } from '../screens/product/type/IProduct'
import apiService from '../services/apiService'

const fetchProducts = async (params: ProductQueryParams): Promise<IServerResponse<IProduct[]>> => {
    return apiService.get<IServerResponse<IProduct[]>>('products', params)
}

export const getProducts = (
    params: ProductQueryParams = {},
): UseQueryResult<IServerResponse<IProduct[]>, Error> => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => fetchProducts(params),
    })
}

export const fetchProductById = async (id: Number): Promise<IProduct> => {
    const data = await apiService.get<{ data: IProduct }>(`products/${id}`)
    return data.data
}

const createProduct = async (product: IProduct): Promise<IServerResponse<IProduct>> => {
    return apiService.post<IServerResponse<IProduct>>('products', product)
}

const updateProduct = async (product: IProduct): Promise<IServerResponse<IProduct>> => {
    return apiService.put<IServerResponse<IProduct>>(`products/${product.id}`, product)
}

export const useCreateProduct = (): UseMutationResult<IServerResponse<IProduct>, Error, IProduct> => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
    })
}

export const useUpdateProduct = (): UseMutationResult<IServerResponse<IProduct>, Error, IProduct> => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
    })
}