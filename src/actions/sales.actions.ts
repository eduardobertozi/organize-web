'use server'

import { env } from '@/env'
import { FetchService } from '@/services/fetch.service'
import {
  SalesInputResponse,
  SalesRequest,
  SalesResponse,
} from '@/@types/sales.types'
import { revalidateTag } from 'next/cache'

const http = new FetchService()
const baseUrl = env.API_BASE_URL

export const fetchAllSales = async (page: number) => {
  const response = await http.get<SalesResponse>({
    url: `${baseUrl}/sales/all?page=${page ?? 1}`,
    headers: {
      Authorization: `Bearer ${env.API_TOKEN}`,
    },
    next: {
      tags: ['sales'],
    },
    cache: 'force-cache',
  })

  return response
}

export const createSale = async (sale: SalesRequest) => {
  const response = await http.post<SalesInputResponse, SalesRequest>({
    url: `${baseUrl}/sales`,
    data: sale,
  })

  revalidateTag('sales')
  return response
}

export const updateSale = async ({ id, ...sale }: SalesRequest) => {
  await http.put<SalesInputResponse, SalesRequest>({
    url: `${baseUrl}/sales/${id}`,
    data: sale,
    headers: {
      Authorization: `Bearer ${env.API_TOKEN}`,
    },
  })

  revalidateTag('sales')
}

export const deleteSale = async (saleId: string) => {
  await http.delete<void>({
    url: `${baseUrl}/sales/${saleId}`,
    headers: {
      Authorization: `Bearer ${env.API_TOKEN}`,
    },
  })

  revalidateTag('sales')
}
