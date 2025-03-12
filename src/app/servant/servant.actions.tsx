'use server'

import { FetchAllServantsUseCase } from '@/domain/servant/application/use-cases/fetch-all-servants.use-case'
import { FindServantByNameUseCase } from '@/domain/servant/application/use-cases/find-servant-by-name.use-case'
import { ServantGateway } from '@/infra/gateway/servant.gateway'
import { FetchService } from '@/infra/http/fetch.service'

export const fetchServants = async (page = 1) => {
  const http = new FetchService()
  const gateway = new ServantGateway(http)
  const fetchAllServantsUseCase = new FetchAllServantsUseCase(gateway)

  const result = await fetchAllServantsUseCase.execute({
    page,
  })

  return result.value!.servants.map((servant) => servant.toJSON())
}

export const findFilteredServants = async (searchText: string, page = 1) => {
  const http = new FetchService()
  const gateway = new ServantGateway(http)
  const findServantsByNameUseCase = new FindServantByNameUseCase(gateway)

  const result = await findServantsByNameUseCase.execute({
    name: searchText,
    page,
  })

  if (result.isLeft()) {
    return []
  }

  return result.value.servants.map((servant) => servant.toJSON())
}
