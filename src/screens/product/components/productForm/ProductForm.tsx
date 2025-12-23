import {
  WuModal,
  WuModalHeader,
  WuModalContent,
  WuInput,
  WuButton,
  WuModalFooter,
  WuModalClose,
} from '@npm-questionpro/wick-ui-lib'
import React, {useEffect, useState} from 'react'
import type {IProduct} from '../../../../types/IProduct'
import {Form} from 'react-router'

interface ProductModalProps {
  product: IProduct | null
  isOpen: boolean
  onClose: () => void
}

const emptyProduct: IProduct = {
  name: '',
  description: '',
  price: 0,
  currency: '',
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [priceError, setPriceError] = useState<string | null>(null)

  const [productFormData, setProductFormData] = useState<IProduct>({
    name: '',
    description: '',
    price: 0,
    currency: '',
  })

  useEffect(() => {
    if (!isOpen) return

    if (product) {
      setProductFormData(product)
    } else {
      setProductFormData(emptyProduct)
    }
  }, [isOpen, product?.id])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('Submitting product:', productFormData)
    const {price} = productFormData

    if (price < 1 || price > 1000) {
      alert('Price must be between 1 and 1000')
      return
    }
    onClose()
    event.preventDefault()
  }

  const handleChange =
    <K extends keyof IProduct>(key: K) =>
    (value: IProduct[K]) => {
      setProductFormData(prev => ({
        ...prev,
        [key]: value,
      }))
    }

  const handlePriceChange = (value: string) => {
    // Allow empty while typing
    if (value === '') {
      setPriceError(null)
      handleChange('price')(value as any)
      return
    }

    const num = Number(value)

    // Not a number
    if (Number.isNaN(num)) {
      setPriceError('Price must be a number')
      return
    }

    // Decimal validation (max 2 decimals)
    const decimalRegex = /^\d+(\.\d{1,2})?$/
    if (!decimalRegex.test(value)) {
      setPriceError('Price can have up to 2 decimal places')
      return
    }

    // Range validation
    if (num < 1 || num > 1000) {
      setPriceError('Price must be between 1 and 1000')
      return
    }

    // Valid price
    setPriceError(null)
    handleChange('price')(num)
  }

  //   if (!product) return null
  return (
    <WuModal open={isOpen} onOpenChange={open => !open && onClose()}>
      <WuModalHeader>
        <p className="wu-text-lg wu-font-bold">Product</p>
      </WuModalHeader>
      <WuModalContent className="wu-max-w-full">
        <div className="wu-p-4">
          <div className="wu-flex wu-flex-col wu-gap-3">
            <form onSubmit={handleSubmit} id="product-form">
              <InfoRow
                label="Name"
                value={productFormData.name}
                onChange={handleChange('name')}
              />

              <InfoRow
                label="Description"
                value={productFormData.description}
                onChange={handleChange('description')}
              />

              <InfoRow
                label="Price"
                value={productFormData.price}
                // onChange={value => handleChange('price')(Number(value))}
                onChange={handlePriceChange}
                error={priceError}
              />
            </form>
          </div>
        </div>
      </WuModalContent>
      <WuModalFooter>
        <WuButton
          type="submit"
          variant="primary"
          form="product-form"
          disabled={productFormData.price < 1 || productFormData.price > 1000}
        >
          Save
        </WuButton>
        <WuModalClose onClick={onClose}>Cancel</WuModalClose>
      </WuModalFooter>
    </WuModal>
  )
}
interface InfoRowProps {
  label: string
  value: any
  onChange: (value: any) => void
  error?: string | null
}

const InfoRow: React.FC<InfoRowProps> = ({label, value, onChange, error}) => (
  <div className="wu-grid wu-grid-cols-1 wu-gap-6">
    <WuInput
      Label={label}
      value={value}
      onChange={e => onChange(e.target.value)}
      type={label === 'Price' ? 'number' : 'text'}
      step={label === 'Price' ? '0.01' : undefined}
      placeholder="Enter text"
      name={label}
    />
    {error && <p className="wu-text-red-500 wu-text-sm">{error}</p>}
  </div>
)
