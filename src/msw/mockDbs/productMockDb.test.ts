import { describe, it, expect, beforeEach } from 'vitest'
import { productMockDb } from './productMockDb'
import type { IProduct } from '../../screens/product/type/IProduct'

describe('productMockDb', () => {
  beforeEach(() => {
    // Reset the database before each test
    productMockDb.reset()
  })

  describe('reset function', () => {
    it('should reset products to initial state', () => {
      // Get initial products
      const initialProducts = productMockDb.getProducts()
      expect(initialProducts).toHaveLength(2)
      expect(initialProducts[0].name).toBe('Armor All Extreme Tire Shine Gel')

      // Add a new product
      const newProduct: IProduct = {
        id: 3,
        name: 'Test Product',
        description: 'Test Description',
        price: 19.99,
        currency: 'USD',
      }
      productMockDb.addProduct(newProduct)

      // Verify product was added
      const productsAfterAdd = productMockDb.getProducts()
      expect(productsAfterAdd).toHaveLength(3)

      // Reset the database
      productMockDb.reset()

      // Verify products are back to initial state
      const productsAfterReset = productMockDb.getProducts()
      expect(productsAfterReset).toHaveLength(2)
      expect(productsAfterReset[0].name).toBe('Armor All Extreme Tire Shine Gel')
      expect(productsAfterReset[1].name).toBe('Black Magic Tire Wet Gel')
    })

    it('should reset modified products to original values', () => {
      // Get initial product
      const initialProduct = productMockDb.getProduct(1)
      expect(initialProduct.price).toBe(9.99)

      // Update the product
      const updatedProduct: IProduct = {
        ...initialProduct,
        price: 29.99,
        name: 'Modified Product',
      }
      productMockDb.updateProduct(updatedProduct)

      // Verify product was updated
      const modifiedProduct = productMockDb.getProduct(1)
      expect(modifiedProduct.price).toBe(29.99)
      expect(modifiedProduct.name).toBe('Modified Product')

      // Reset the database
      productMockDb.reset()

      // Verify product is back to original state
      const resetProduct = productMockDb.getProduct(1)
      expect(resetProduct.price).toBe(9.99)
      expect(resetProduct.name).toBe('Armor All Extreme Tire Shine Gel')
    })

    it('should handle multiple operations before reset', () => {
      // Perform multiple operations
      const newProduct: IProduct = {
        id: 4,
        name: 'Another Product',
        description: 'Another Description',
        price: 49.99,
        currency: 'USD',
      }
      productMockDb.addProduct(newProduct)

      const updatedProduct: IProduct = {
        ...productMockDb.getProduct(1),
        price: 99.99,
      }
      productMockDb.updateProduct(updatedProduct)

      // Verify changes
      expect(productMockDb.getProducts()).toHaveLength(3)
      expect(productMockDb.getProduct(1).price).toBe(99.99)

      // Reset
      productMockDb.reset()

      // Verify everything is back to initial state
      const products = productMockDb.getProducts()
      expect(products).toHaveLength(2)
      expect(productMockDb.getProduct(1).price).toBe(9.99)
      expect(productMockDb.getProduct(2).price).toBe(13.99)
    })
  })

  describe('getProduct', () => {
    it('should return the correct product by id', () => {
      const product = productMockDb.getProduct(1)
      expect(product.id).toBe(1)
      expect(product.name).toBe('Armor All Extreme Tire Shine Gel')
    })

    it('should return first product if id not found', () => {
      const product = productMockDb.getProduct(999)
      expect(product.id).toBe(1)
    })
  })

  describe('getProducts', () => {
    it('should return all products', () => {
      const products = productMockDb.getProducts()
      expect(products).toHaveLength(2)
    })
  })

  describe('addProduct', () => {
    it('should add a new product', () => {
      const newProduct: IProduct = {
        id: 5,
        name: 'New Product',
        description: 'New Description',
        price: 24.99,
        currency: 'USD',
      }
      productMockDb.addProduct(newProduct)

      const products = productMockDb.getProducts()
      expect(products).toHaveLength(3)
      expect(products[2]).toEqual(newProduct)
    })
  })

  describe('updateProduct', () => {
    it('should update an existing product', () => {
      const updatedProduct: IProduct = {
        id: 1,
        name: 'Updated Product Name',
        description: 'Updated Description',
        price: 15.99,
        currency: 'EUR',
      }
      productMockDb.updateProduct(updatedProduct)

      const product = productMockDb.getProduct(1)
      expect(product).toEqual(updatedProduct)
    })

    it('should not affect other products', () => {
      const updatedProduct: IProduct = {
        id: 1,
        name: 'Updated Product',
        description: 'Updated',
        price: 15.99,
        currency: 'EUR',
      }
      productMockDb.updateProduct(updatedProduct)

      const product2 = productMockDb.getProduct(2)
      expect(product2.name).toBe('Black Magic Tire Wet Gel')
      expect(product2.price).toBe(13.99)
    })
  })
})
