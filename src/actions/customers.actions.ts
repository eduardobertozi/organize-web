'use server'

import {
  CreateCustomerResponse,
  CustomerRequest,
  CustomersResponse,
} from '@/@types/customers.types'
import { env } from '@/env'
import { FetchService } from '@/services/fetch.service'
import { revalidateTag } from 'next/cache'

const http = new FetchService()
const baseUrl = `${env.API_BASE_URL}/customers`

export const fetchAllCustomers = async (q?: string) => {
  const response = await http.get<CustomersResponse>({
    url: `${baseUrl}?q=${q ?? ''}`,
    headers: {
      Authorization: `Bearer ${env.API_TOKEN}`,
    },
    cache: 'force-cache',
    next: {
      tags: ['customers'],
    },
  })

  return response
}

export const createCustomer = async (customer: CustomerRequest) => {
  const response = await http.post<CreateCustomerResponse, CustomerRequest>({
    url: baseUrl,
    data: customer,
    headers: {
      Authorization: `Bearer ${env.API_TOKEN}`,
    },
  })

  revalidateTag('customers')
  return response
}
