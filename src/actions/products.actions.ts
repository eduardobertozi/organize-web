'use server'

import { FetchService } from '@/services/fetch.service'
import { revalidatePath } from 'next/cache'
import { env } from '@/env'
import { FetchProducts, Product, ProductRequest } from './products.types'

const http = new FetchService()
const baseUrl = `${env.API_BASE_URL}/products`

export const fetchAllProducts = async (page?: number) => {
  const response = await http.get<FetchProducts>({
    url: `${baseUrl}/all?page=${page ?? 1}`,
    headers: {
      Authorization: `Bearer ${env.API_TOKEN}`,
    },
    cache: 'force-cache',
  })

  return response
}

export const fetchProductByName = async (name: string, page?: number) => {
  const response = await http.get<FetchProducts>({
    url: `${baseUrl}?name=${name}&page=${page ?? 1}`,
    cache: 'force-cache',
    headers: {
      Authorization: `Bearer ${env.API_TOKEN}`,
    },
  })

  return response
}

export const createProduct = async (product: ProductRequest) => {
  const response = await http.post<Product, ProductRequest>({
    url: baseUrl,
    data: product,
    headers: {
      Authorization: `Bearer ${env.API_TOKEN}`,
    },
  })

  console.log(response, 'RESPONSE')

  revalidatePath('/products')

  return response
}

export const updateProduct = async ({ id, ...product }: ProductRequest) => {
  const response = await http.put<Product, ProductRequest>({
    url: `${baseUrl}/${id}`,
    data: product,
    headers: {
      Authorization: `Bearer ${env.API_TOKEN}`,
    },
  })

  revalidatePath('/products')

  return response
}

export const deleteProduct = async (productId: string) => {
  const response = await http.delete<void>({
    url: `${baseUrl}/${productId}`,
    headers: {
      Authorization: `Bearer ${env.API_TOKEN}`,
    },
  })

  revalidatePath('/products')

  return response
}
