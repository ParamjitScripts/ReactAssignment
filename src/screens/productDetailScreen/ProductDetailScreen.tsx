import {WuButton} from '@npm-questionpro/wick-ui-lib'
import React from 'react'
import {Link, useParams} from 'react-router'
import {API_BASE_URL} from '../../constants/appConstants'
import type {IProduct} from '../../types/IProduct'
import {useQuery} from '@tanstack/react-query'
import {fetchProductById} from '../../hooks/ProductApi'

const useProductIdFromParams = (): Number => {
  const {productId} = useParams<{productId: string}>() // Placeholder for useParams
  console.log('productId from params:', productId)
  if (!productId || productId.trim() === '' || isNaN(Number(productId))) {
    throw new Error('Invalid product ID: ' + productId)
  }
  const id = Number(productId)
  return id
}
export default function ProductDetailScreen() {
  const id = useProductIdFromParams()

  const {data, error, isLoading} = useQuery<IProduct, Error>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    console.error('Error fetching product:', error)
    return <div>Error: {error?.message || 'Something went wrong'}</div>
  }

  const product = data
  if (!product) {
    throw new Error('Product not found')
  }

  return (
    <>
      <h1>Product Detail</h1>
      {product && (
        <div>
          <p>
            <strong>Name:</strong> {product.name}
          </p>
          <p>
            <strong>Price:</strong> {product.price}
          </p>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
        </div>
      )}
      <Link to="/products">Back to Products</Link>
    </>
  )
}
