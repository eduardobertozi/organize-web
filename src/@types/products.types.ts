import { Optional } from '@/utils/optional'

export type ProductAttachment = {
  id: string
  title: string
  url: string
}

export type Product = {
  id: string
  name: string
  price: number
  reference: string
  attachments: ProductAttachment[]
  supplierId?: string | null
  stock: number
  createdAt?: Date | null
  updatedAt?: Date | null
}

export type ProductsRequest = Optional<
  Product,
  'id' | 'createdAt' | 'updatedAt'
>

export type ProductsResponse = {
  total: number
  next: number | null
  previous: number | null
  products: Product[]
}

export type ProductsInputResponse = {
  message?: string
  servants?: Product[]
  servant?: Product
}
