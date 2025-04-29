'use server'

import { env } from '@/env'
import { FetchService } from '@/services/fetch.service'
import {
  SuppliersInputResponse,
  SuppliersRequest,
  SuppliersResponse,
} from '@/@types/suppliers.types'
import { revalidateTag } from 'next/cache'

const http = new FetchService()
const baseUrl = env.API_BASE_URL

export const fetchAllSuppliers = async (page?: number) => {
  const response = await http.get<SuppliersResponse>({
    url: `${baseUrl}/suppliers/all?page=${page ?? 1}`,
    next: {
      tags: ['suppliers'],
    },
    cache: 'force-cache',
  })

  return response
}

export const fetchSupplierByName = async (name: string, page?: number) => {
  const response = await http.get<SuppliersResponse>({
    url: `${baseUrl}/suppliers/all?q=${name}&page=${page ?? 1}`,
    cache: 'force-cache',
  })

  return response
}

export const createSupplier = async (supplier: SuppliersRequest) => {
  const response = await http.post<SuppliersInputResponse, SuppliersRequest>({
    url: `${baseUrl}/suppliers`,
    data: supplier,
  })

  revalidateTag('suppliers')
  return response
}

export const updateSupplier = async ({ id, ...supplier }: SuppliersRequest) => {
  const response = await http.put<SuppliersInputResponse, SuppliersRequest>({
    url: `${baseUrl}/suppliers/${id}`,
    data: supplier,
  })

  revalidateTag('suppliers')
  return response
}

export const deleteSupplier = async (supplierId: string) => {
  await http.delete<void>({
    url: `${baseUrl}/suppliers/${supplierId}`,
  })

  revalidateTag('suppliers')
}
