import { Optional } from '@/utils/optional'

export type Servant = {
  id: string
  name: string
  productsPrice: number
  workForcePrice: number
  profitPercent: number
  price: number
  products: string[]
  createdAt?: Date | null
  updatedAt?: Date | null
}

export type ServantsRequest = Optional<
  Servant,
  'id' | 'createdAt' | 'updatedAt'
>

export type ServantsResponse = {
  total: number
  next: number | null
  previous: number | null
  servants: Servant[]
}

export type ServantsInputResponse = {
  message?: string
  servants?: Servant[]
  servant?: Servant
}
