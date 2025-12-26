import { HttpResponse, http } from 'msw'
import { productMockDb } from '../mockDbs/productMockDb'
import { API_BASE_URL } from '../../constants/appConstants'
import type { IProduct } from '../../screens/product/type/IProduct'

const sendResponse = <T>(res: T): HttpResponse<{ data: T }> => {
  return HttpResponse.json({ data: res })
}

export const mswDevHandlers = [
  http.get(`${API_BASE_URL}products/:id`, async ({ params }) => {
    await delayedResponse();
    const id = Number(params.id)
    if (!id) {
      return HttpResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    } else if (isNaN(id) || id <= 0) {
      return HttpResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      )
    }
    const product = productMockDb.getProduct(id)
    if (!product) {
      return HttpResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    return sendResponse<IProduct>(product)
  }),
  http.get(`${API_BASE_URL}products`, () => {
    const products = productMockDb.getProducts()
    return sendResponse<IProduct[]>(products)
  }),
  http.post(`${API_BASE_URL}products`, async ({ request }) => {
    await delayedResponse();
    const newProduct = await request.json() as IProduct
    const productWithId = {
      ...newProduct,
      id: Date.now(),
    }
    productMockDb.addProduct(productWithId)
    return sendResponse<IProduct>(productWithId)
  }),
  http.put(`${API_BASE_URL}products/:id`, async ({ params, request }) => {
    await delayedResponse();
    const id = Number(params.id)
    const updatedProduct = await request.json() as IProduct
    const product = productMockDb.getProduct(id)
    if (!product) {
      return HttpResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    productMockDb.updateProduct({ ...updatedProduct, id })
    return sendResponse<IProduct>({ ...updatedProduct, id })
  }),
]
function delayedResponse(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 500))
}

