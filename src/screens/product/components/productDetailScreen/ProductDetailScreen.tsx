import {
  WuButton,
  WuCard,
  WuDataTable,
  WuHeading,
  WuTable,
} from '@npm-questionpro/wick-ui-lib'
import {Link, useParams} from 'react-router'
import type {IProduct} from '../../../../types/IProduct'
import {useQuery} from '@tanstack/react-query'
import {fetchProductById} from '../../../../hooks/ProductApi'
import styles from './ProductDetailScreen.module.css'

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
  const cardExample = () => {
    return (
      <WuCard rounded onClick={function uV() {}}>
        {/* <WuHeading size="md">{product.name}</WuHeading> */}
        <table className={styles.table}>
          <tbody>
            <tr className={styles.border}>
              <td className={`wu-font-bold wu-pr-4 ${styles.leftAlign}`}>
                ID:
              </td>
              <td className={styles.leftAlign}>{product.id}</td>
            </tr>
            <tr className={styles.border}>
              <td className={`wu-font-bold wu-pr-4 ${styles.leftAlign}`}>
                Name:
              </td>
              <td className={styles.leftAlign}>{product.name}</td>
            </tr>
            <tr className={styles.border}>
              <td className={`wu-font-bold wu-pr-4 ${styles.leftAlign}`}>
                Description:
              </td>
              <td className={styles.leftAlign}>{product.description}</td>
            </tr>
            <tr className={styles.border}>
              <td className={`wu-font-bold wu-pr-4 ${styles.leftAlign}`}>
                Price:
              </td>
              <td className={styles.leftAlign}>{product.price}</td>
            </tr>
          </tbody>
        </table>
        <div className="wu-flex wu-items-end wu-justify-end wu-gap-4 wu-pb-4">
          {/* <WuButton>Action</WuButton> */}
          <WuButton variant="outline">
            <Link to="/products">Back to Products</Link>
          </WuButton>
        </div>
      </WuCard>
    )
  }

  return (
    <>
      <h1 className={styles.h1}>Product Detail : {product.name}</h1>
      {product && <div className="wu-h-40">{cardExample()}</div>}
    </>
  )
}
