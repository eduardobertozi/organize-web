'use server'

import { Servant, ServantRequest } from '@/app/servants/servant.model'
import { env } from '@/env'
import { FetchService } from '@/services/fetch.service'
import { revalidateTag } from 'next/cache'
import { FetchServants } from './components/list-servants/list-servants.types'

const http = new FetchService()
const baseUrl = `${env.API_BASE_URL}/servants`

export type ServantsAPIResponse = {
  message?: string
  servants?: Servant[]
  servant?: Servant
}

export const fetchAllServants = async (page: number) => {
  const response = await http.get<FetchServants>({
    url: `${baseUrl}/all?page=${page}`,
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
  const response = await http.get<FetchServants>({
    url: `${baseUrl}?name=${name}&page=${page ?? 1}`,
    cache: 'force-cache',
    headers: {
      Authorization: `Bearer ${env.API_TOKEN}`,
    },
  })

  return response
}

export const createServant = async (servant: ServantRequest) => {
  const response = await http.post<ServantsAPIResponse, ServantRequest>({
    url: baseUrl,
    data: servant,
  })

  revalidateTag('servants')
  return response
}

export const updateServant = async ({ id, ...servant }: ServantRequest) => {
  const response = await http.put<ServantsAPIResponse, ServantRequest>({
    url: `${baseUrl}/${id}`,
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
    url: `${baseUrl}/${servantId}`,
    headers: {
      Authorization: `Bearer ${env.API_TOKEN}`,
    },
  })

  revalidateTag('servants')

  return response
}
