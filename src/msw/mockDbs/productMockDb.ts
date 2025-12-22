import type { IProduct } from '../../types/IProduct'

export const productMockDb = {
    getProduct: (): IProduct[] => {
        return [{
            id: 1,
            name: 'Armor All Extreme Tire Shine Gel',
            description: 'Armor All Extreme Tire Shine , 12 oz. Provides a deep, black shine that lasts for weeks. Non-greasy formula resists water and heat.',
            price: 9.99,
            currency: 'USD',
        },
        {
            id: 2,
            name: ' Black Magic Tire Wet Gel',
            description: ' Black Magic Tire Wet Gel, 16 oz. Provides a deep, black shine that lasts for weeks. Non-greasy formula resists water and heat.',
            price: 13.99,
            currency: 'USD',
        }]
    },
}
