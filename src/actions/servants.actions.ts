'use server'

import { env } from '@/env'
import { FetchService } from '@/services/fetch.service'
import {
  ServantsInputResponse,
  ServantsRequest,
  ServantsResponse,
} from '@/types/servants.types'
import { revalidateTag } from 'next/cache'

const http = new FetchService()
const baseUrl = env.API_BASE_URL

export const fetchAllServants = async (page: number) => {
  const response = await http.get<ServantsResponse>({
    url: `${baseUrl}/servants/all?page=${page ?? 1}`,
    headers: {
      Authorization: `Bearer ${env.API_TOKEN}`,
    },
    next: {
      tags: ['servants'],
    },
    cache: 'force-cache',
  })

  return response
}

export const fetchServantByName = async (name: string, page?: number) => {
  console.log(name)

  const response = await http.get<ServantsResponse>({
    url: `${baseUrl}/servants/all?name=${name}&page=${page ?? 1}`,
    cache: 'force-cache',
    headers: {
      Authorization: `Bearer ${env.API_TOKEN}`,
    },
  })

  return response
}

export const createServant = async (servant: ServantsRequest) => {
  const response = await http.post<ServantsInputResponse, ServantsRequest>({
    url: `${baseUrl}/servants`,
    data: servant,
  })

  revalidateTag('servants')
  return response
}

export const updateServant = async ({ id, ...servant }: ServantsRequest) => {
  const response = await http.put<ServantsInputResponse, ServantsRequest>({
    url: `${baseUrl}/servants/${id}`,
    data: servant,
    headers: {
      Authorization: `Bearer ${env.API_TOKEN}`,
    },
  })

  revalidateTag('servants')

  return response
}

export const deleteServant = async (servantId: string) => {
  const response = await http.delete<void>({
    url: `${baseUrl}/servants/${servantId}`,
    headers: {
      Authorization: `Bearer ${env.API_TOKEN}`,
    },
  })

  revalidateTag('servants')

  return response
}
