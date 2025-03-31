import { Optional } from '@/utils/optional'
import { Product } from '../products/products.types'

export interface Servant {
  id: string
  name: string
  productsPrice: number
  workForcePrice: number
  profitPercent: number
  price: number
  products?: Product[]
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface ServantRequest
  extends Optional<Servant, 'id' | 'createdAt' | 'updatedAt'> {}
