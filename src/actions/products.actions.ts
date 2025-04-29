'use server'

import {
  ProductsInputResponse,
  ProductsRequest,
  ProductsResponse,
} from '@/@types/products.types'
import { env } from '@/env'
import { FetchService } from '@/services/fetch.service'
import { revalidateTag } from 'next/cache'

const http = new FetchService()
const baseUrl = `${env.API_BASE_URL}/products`

export const fetchAllProducts = async (page?: number) => {
  const response = await http.get<ProductsResponse>({
    url: `${baseUrl}/all?page=${page ?? 1}`,
    cache: 'force-cache',
    next: {
      tags: ['products'],
    },
  })

  return response
}

export const fetchProductByName = async (name: string, page?: number) => {
  const response = await http.get<ProductsResponse>({
    url: `${baseUrl}?name=${name}&page=${page ?? 1}`,
    cache: 'force-cache',
    next: {
      tags: ['products'],
    },
  })

  return response
}

export const createProduct = async (product: ProductsRequest) => {
  /* TODO: Implements return when backend already fix */
  await http.post<ProductsInputResponse, ProductsRequest>({
    url: baseUrl,
    data: product,
  })

  revalidateTag('products')
}

export const updateProduct = async ({ id, ...product }: ProductsRequest) => {
  /* TODO: Implements return when backend already fix */
  await http.put<ProductsInputResponse, ProductsRequest>({
    url: `${baseUrl}/${id}`,
    data: product,
  })

  revalidateTag('products')
}

export const deleteProduct = async (productId: string) => {
  await http.delete<void>({
    url: `${baseUrl}/${productId}`,
  })

  revalidateTag('products')
}
