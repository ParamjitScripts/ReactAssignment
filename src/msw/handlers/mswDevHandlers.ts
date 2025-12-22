import { HttpResponse, http } from 'msw'
import { productMockDb } from '../mockDbs/productMockDb'
import { API_BASE_URL } from '../../constants/appConstants'
import type { IProduct } from '../../types/IProduct'

const sendResponse = <T>(res: T): HttpResponse<{ data: T }> => {
  return HttpResponse.json({ data: res })
}

export const mswDevHandlers = [
  http.get(`${API_BASE_URL}product`, () => {
    const product = productMockDb.getProduct()
    return sendResponse<IProduct>(product)
  }),
  http.get(`${API_BASE_URL}products`, () => {
    const products = productMockDb.getProducts()
    return sendResponse<IProduct[]>(products)
  }),
]
