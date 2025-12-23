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
    event.preventDefault()
    console.log('Submitting product:', productFormData)
    onClose()
  }

  const handleChange =
    <K extends keyof IProduct>(key: K) =>
    (value: IProduct[K]) => {
      setProductFormData(prev => ({
        ...prev,
        [key]: value,
      }))
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
            <form onSubmit={handleSubmit}>
              <InfoRow
                label="Name"
                value={productFormData.name}
                onChange={handleChange('name')}
              />

              <InfoRow
                label="Department"
                value={productFormData.description}
                onChange={handleChange('description')}
              />

              <InfoRow
                label="Price"
                value={productFormData.price}
                onChange={value => handleChange('price')(Number(value))}
              />
              <div className="wu-p-2 wu-flex wu-justify-end wu-gap-2 wu-mt-4"></div>
            </form>
          </div>
        </div>
      </WuModalContent>
      <WuModalFooter>
        <WuButton type="submit" variant="primary">
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
}

const InfoRow: React.FC<InfoRowProps> = ({label, value, onChange}) => (
  <div className="wu-grid wu-grid-cols-1 wu-gap-6">
    <WuInput
      Label={label}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Enter text"
      type="text"
      name={label}
    />
  </div>
)
