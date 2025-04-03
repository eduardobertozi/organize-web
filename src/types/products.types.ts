import { Optional } from '@/utils/optional'

export type Product = {
  id: string
  name: string
  price: number
  reference: string
  supplierId?: string | null
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
