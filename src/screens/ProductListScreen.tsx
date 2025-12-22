import {
  WuDisplay,
  WuInput,
  WuTable,
  type IWuTableColumnDef,
} from '@npm-questionpro/wick-ui-lib'
import type {IProduct} from '../types/IProduct'
import {getProducts} from '../hooks/ProductApi'
import {useState} from 'react'

export const ProductListScreen: React.FC = () => {
  const {data, error, isLoading} = getProducts()
  const [filterText, setFilterText] = useState('')

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
          <div>
            <button onClick={() => alert(`Viewing product: ${product.name}`)}>
              View
            </button>
          </div>
        )
      },
    },
  ]

  return (
    <>
      <WuDisplay size="lg">Product List Screen</WuDisplay>
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
      />
    </>
  )
}
