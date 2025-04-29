import { Optional } from '@/utils/optional'

export type Sale = {
  id: string
  description?: string | null
  amount: number
  customerId: string
  employeeId: string
  employee: string
  servants: string[]
  createdAt?: Date | null
  updatedAt?: Date | null
}

export type SalesRequest = Optional<
  Sale,
  'id' | 'createdAt' | 'updatedAt' | 'employeeId' | 'employee'
>

export type SalesResponse = {
  total: number
  next: number | null
  previous: number | null
  sales: Sale[]
}

export type SalesInputResponse = {
  message?: string
  sales?: Sale[]
  sale?: Sale
}
