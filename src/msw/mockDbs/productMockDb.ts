import type { IProduct } from '../../screens/product/type/IProduct'

const initialProducts: IProduct[] = [{
    id: 1,
    name: 'Armor All Extreme Tire Shine Gel',
    description: 'Armor All Extreme Tire Shine , 12 oz. Provides a deep, black shine that lasts for weeks. Non-greasy formula resists water and heat.',
    price: 9.99,
    currency: 'USD',
},
{
    id: 2,
    name: 'Black Magic Tire Wet Gel',
    description: 'Black Magic Tire Wet Gel, 16 oz. Provides a deep, black shine that lasts for weeks. Non-greasy formula resists water and heat.',
    price: 13.99,
    currency: 'USD',
}]

let products: IProduct[] = [...initialProducts]

export const productMockDb = {
    getProduct: (id: number): IProduct => {
        return products.find(product => product.id === id) || products[0]
    },
    getProducts: (): IProduct[] => {
        return [...products]
    },
    updateProduct: (updated: IProduct): void => {
        products = products.map(p =>
            p.id === updated.id ? updated : p
        )
    },

    addProduct: (product: IProduct): void => {
        products = [...products, product]
    },

    reset: (): void => {
        products = [...initialProducts]
    },
}