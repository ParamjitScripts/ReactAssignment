export interface IProduct {
  id?: number
  name: string
  description: string
  price: number
  currency: string
}

export interface ProductQueryParams {
  search?: string
  name?: string
}

export interface ProductModalProps {
  product: IProduct | null
  isOpen: boolean
  onClose: () => void
}

export interface InfoRowProps {
  label: string
  value: any
  onChange: (value: any) => void
  error?: string | null
}