import {
  WuModal,
  WuModalHeader,
  WuModalContent,
  WuInput,
  WuButton,
  WuModalFooter,
  WuModalClose,
} from '@npm-questionpro/wick-ui-lib'
import {useForm, Controller} from 'react-hook-form'
import React, {useEffect} from 'react'
import type {
  InfoRowProps,
  IProduct,
  ProductModalProps,
} from '../../type/IProduct'
import {useCreateProduct, useUpdateProduct} from '../../../../hooks/ProductApi'

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
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm<IProduct>({
    defaultValues: emptyProduct,
    mode: 'onChange',
  })

  const createProductMutation = useCreateProduct()
  const updateProductMutation = useUpdateProduct()

  useEffect(() => {
    if (!isOpen) return

    if (product) {
      reset(product)
    } else {
      reset(emptyProduct)
    }
  }, [isOpen, product?.id, reset])

  const onSubmit = (data: IProduct) => {
    if (product?.id) {
      updateProductMutation.mutate(
        {...data, id: product.id},
        {
          onSuccess: () => {
            onClose()
          },
        },
      )
    } else {
      createProductMutation.mutate(data, {
        onSuccess: () => {
          onClose()
        },
      })
    }
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
            <form onSubmit={handleSubmit(onSubmit)} id="product-form">
              <Controller
                name="name"
                control={control}
                rules={{required: 'Name is required'}}
                render={({field}) => (
                  <InfoRow
                    label="Name"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.name?.message}
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                rules={{required: 'Description is required'}}
                render={({field}) => (
                  <InfoRow
                    label="Description"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.description?.message}
                  />
                )}
              />

              <Controller
                name="price"
                control={control}
                rules={{
                  required: 'Price is required',
                  min: {value: 1, message: 'Price must be at least 1'},
                  max: {value: 1000, message: 'Price must not exceed 1000'},
                  validate: {
                    decimal: (value: number) => {
                      const decimalRegex = /^\d+(\.\d{1,2})?$/
                      return (
                        decimalRegex.test(String(value)) ||
                        'Price can have up to 2 decimal places'
                      )
                    },
                  },
                }}
                render={({field}) => (
                  <InfoRow
                    label="Price"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.price?.message}
                  />
                )}
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
          disabled={
            !isValid ||
            createProductMutation.isPending ||
            updateProductMutation.isPending
          }
        >
          {createProductMutation.isPending || updateProductMutation.isPending
            ? 'Saving...'
            : 'Save'}
        </WuButton>
        <WuModalClose onClick={onClose}>Cancel</WuModalClose>
      </WuModalFooter>
    </WuModal>
  )
}

const InfoRow: React.FC<InfoRowProps> = ({label, value, onChange, error}) => (
  <div className="wu-grid wu-grid-cols-1 wu-gap-6">
    <WuInput
      Label={label}
      value={value}
      onChange={e => {
        const newValue = label === 'Price' ? Number(e.target.value) : e.target.value
        onChange(newValue)
      }}
      type={label === 'Price' ? 'number' : 'text'}
      step={label === 'Price' ? '0.01' : undefined}
      placeholder="Enter text"
      name={label}
    />
    {error && <p className="wu-text-red-500 wu-text-sm">{error}</p>}
  </div>
)
