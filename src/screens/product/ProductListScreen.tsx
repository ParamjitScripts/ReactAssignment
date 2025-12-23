import {
  WuButton,
  WuDisplay,
  WuInput,
  WuTable,
  type IWuTableColumnDef,
} from '@npm-questionpro/wick-ui-lib'
import type {IProduct} from '../../types/IProduct'
import {getProducts} from '../../hooks/ProductApi'
import {useState} from 'react'
import {ProductModal} from './components/productForm/ProductForm'
import {Link} from 'react-router'

export const ProductListScreen: React.FC = () => {
  const {data, error, isLoading} = getProducts()
  const [filterText, setFilterText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)

  const openModal = (product: IProduct) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    console.error('Error fetching product:', error)
    return <div>Error: {error?.message || 'Something went wrong'}</div>
  }
  const products = data?.data
  if (!products || products.length === 0) {
    throw new Error('Products not found')
  }

  const columns: IWuTableColumnDef<IProduct>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
      cellAlign: 'left',
      enableSorting: true,
      filterable: true,
      cell: info => (
        <a href={`/products/${info.row.original.id}`}>
          {String(info.getValue())}
        </a>
      ),
    },
    {
      header: 'Price',
      accessorKey: 'price',
      cellAlign: 'left',
      enableSorting: true,
    },
    {
      header: 'Description',
      accessorKey: 'description',
      cellAlign: 'left',
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      cellAlign: 'left',
      cell: info => {
        const product = info.row.original
        return (
          <div className="wu-flex wu-align-center wu-gap-2">
            {/* <button onClick={() => alert(`Viewing product: ${product.name}`)}>
              View
            </button> */}
            <WuButton variant="outline">
              <Link to={`/products/${info.row.original.id}`}>View</Link>
            </WuButton>
            <WuButton onClick={() => openModal(product)}>Edit</WuButton>
          </div>
        )
      },
    },
  ]

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
        sort={{
          enabled: true,
          initial: [{id: 'name', desc: false}],
        }}
        filterText={filterText}
        columns={columns}
        data={products}
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
