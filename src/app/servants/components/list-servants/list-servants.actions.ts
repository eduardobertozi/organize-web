'use server'

import { ServantGateway } from '@/infra/gateway/servant.gateway'
import { FetchService } from '@/infra/http/fetch.service'
import { ServantJson } from '@/root/core/domain/servant/enterprise/servant'

const http = new FetchService()
const servantGateway = new ServantGateway(http)

export const fetchAllServants = async () => {
  const response = await servantGateway.findAll()
  return response
}

export const fetchAllPaginatedServants = async (page: number) => {
  const response = await servantGateway.findAll(page)
  return response
}

export const fetchServantByName = async (name: string) => {
  const response = await servantGateway.findByName(name)
  return response
}

export const createServant = async (servant: ServantJson) => {
  await servantGateway.create(servant)
}

export const deleteServant = async (servant: ServantJson) => {
  await servantGateway.delete(servant)
}
