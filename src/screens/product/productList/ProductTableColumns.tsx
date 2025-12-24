import {WuButton} from '@npm-questionpro/wick-ui-lib'
import type {IWuTableColumnDef} from '@npm-questionpro/wick-ui-lib'
import type {IProduct} from '../type/IProduct'
import {Link} from 'react-router'

export const getProductColumns = (
  openModal: (product: IProduct) => void,
): IWuTableColumnDef<IProduct>[] => {
  //console.log('table columns function called')
  return [
    {
      header: 'Name',
      accessorKey: 'name',
      cellAlign: 'left',
      enableSorting: true,
      filterable: true,
      cell: info => (
        <Link to={`/products/${info.row.original.id}`}>
          {String(info.getValue())}
        </Link>
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
            <Link to={`/products/${product.id}`}>
              <WuButton variant="outline">View</WuButton>
            </Link>
            <WuButton onClick={() => openModal(product)}>Edit</WuButton>
          </div>
        )
      },
    },
  ]
}
