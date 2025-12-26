import {
  WuButton,
  WuDisplay,
  WuInput,
  WuTable,
  type IWuTableColumnDef,
} from '@npm-questionpro/wick-ui-lib'
import type {IProduct} from '../type/IProduct'
import {getProducts} from '../../../hooks/ProductApi'
import {useCallback, useMemo, useState} from 'react'
import {ProductModal} from '../feature/productForm/ProductForm'
import {getProductColumns} from './ProductTableColumns'
import {productMockDb} from '../../../msw/mockDbs/productMockDb'

export const ProductListScreen: React.FC = () => {
  const {data, error, isLoading} = getProducts()
  const [filterText, setFilterText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)

  const openModal = useCallback((product: IProduct | null) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }, [])

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
    //productMockDb.reset()
  }

  const columns: IWuTableColumnDef<IProduct>[] = useMemo(
    () => getProductColumns(openModal),
    [openModal],
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    console.error('Error fetching product:', error)
    return <div>Error: {error?.message || 'Something went wrong'}</div>
  }
  const products = data?.data
  console.log('Fetched products:', products)
  // Display message if no products found instead of throwing an error
  // if (!products || products !== undefined || products.length === 0) {
  //   //throw new Error('Products not found')
  // }

  //const columns = getProductColumns(openModal)

  return (
    <>
      <div className="wu-flex wu-items-center wu-justify-between wu-my-4 wu-py-2">
        <WuDisplay size="md">Product List Screen</WuDisplay>
        <WuButton
          onClick={() => openModal(null)}
          variant="primary"
          className="wu-mb-4 wu-mt-2"
        >
          Create Product
        </WuButton>
      </div>
      <WuInput
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
        placeholder="Search..."
      />
      <WuTable
        NoDataContent={
          <h2 className="wu-text-center wu-text-red-400">No Product Found!</h2>
        }
        sort={{
          enabled: true,
          initial: [{id: 'name', desc: false}],
        }}
        filterText={filterText}
        columns={columns}
        data={products || []}
        variant="striped"
      />

      <ProductModal
        product={selectedProduct || null}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  )
}
