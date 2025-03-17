export interface Servant {
  id: string
  name: string
  productIds: string[]
  productsPrice: number
  workForcePrice: number
  profitPercent: number
  createdAt?: Date
  updatedAt?: Date | null
}
