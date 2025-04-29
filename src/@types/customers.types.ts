import { Optional } from '@/utils/optional'

export interface Customer {
  id: string
  name: string
  phone: string
  userId: string
  createdAt?: Date | null
  updatedAt?: Date | null
}

export type CustomerRequest = Optional<
  Customer,
  'id' | 'createdAt' | 'updatedAt'
>

export type CustomersResponse = {
  total: number
  next: number | null
  previous: number | null
  customers: Customer[]
}

export type CreateCustomerResponse = {
  customer: Customer
}

export type CustomersInputResponse = {
  message?: string
  customers?: Customer[]
}
