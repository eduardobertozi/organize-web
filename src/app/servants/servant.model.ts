import { Optional } from '@/utils/optional'

export interface Servant {
  id: string
  name: string
  productsPrice: number
  workForcePrice: number
  profitPercent: number
  price: number
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface ServantRequest extends Optional<Servant, 'id' | 'createdAt' | 'updatedAt'> {}
