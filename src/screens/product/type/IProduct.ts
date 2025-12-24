export interface IProduct {
  id?: number
  name: string
  description: string
  price: number
  currency: string
}

export interface ProductQueryParams {
  search?: string
  name?: string
}