import { Optional } from '@/utils/optional'

export type Supplier = {
  id: string
  name: string
  email: string
  phone: string
  city: string
  state: string
  address: string
  createdAt?: Date | null
  updatedAt?: Date | null
}

export type SuppliersRequest = Optional<
  Supplier,
  'id' | 'createdAt' | 'updatedAt'
>

export type SuppliersResponse = {
  total: number
  next: number | null
  previous: number | null
  suppliers: Supplier[]
}

export type SuppliersInputResponse = {
  message?: string
  suppliers?: Supplier[]
  supplier?: Supplier
}
