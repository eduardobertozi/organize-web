'use server'

import { FetchAllServantsUseCase } from '@/domain/servant/application/use-cases/fetch-all-servants.use-case'
import { FindServantByNameUseCase } from '@/domain/servant/application/use-cases/find-servant-by-name.use-case'
import { makeServant } from '@/test/factories/make-servant'
import { InMemoryServantRepository } from '@/test/in-memory/in-memory-servant.repository'

export const fetchServants = async (page = 1) => {
  /* TODO: Override InMemoryRepositories to json-server fetch data */
  const servantsItems = Array.from({ length: 50 }, () => {
    return makeServant()
  })

  const fetchAllServantsUseCase = new FetchAllServantsUseCase(
    new InMemoryServantRepository(servantsItems),
  )

  const { value } = await fetchAllServantsUseCase.execute({
    page,
  })

  return value!.servants.map((servant) => servant.toJSON())
}

export const findFilteredServants = async (searchText: string, page = 1) => {
  /* TODO: Override InMemoryRepositories to json-server fetch data */
  const servantsItems = Array.from({ length: 50 }, () => {
    return makeServant()
  })

  const fetchAllServantsUseCase = new FindServantByNameUseCase(
    new InMemoryServantRepository(servantsItems),
  )

  const result = await fetchAllServantsUseCase.execute({
    name: searchText,
    page,
  })

  if (result.isLeft()) {
    return []
  }

  return result.value.servants.map((servant) => servant.toJSON())
}
