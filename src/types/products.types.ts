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

export type ProductRequest = Optional<Product, 'id' | 'createdAt' | 'updatedAt'>

export type ProductResponse = {
  total: number
  next: number | null
  previous: number | null
  products: Product[]
}
