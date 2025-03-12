'use server'

import { FetchAllServantsUseCase } from '@/domain/servant/application/use-cases/fetch-all-servants.use-case'
import { makeServant } from '@/test/factories/make-servant'
import { InMemoryServantRepository } from '@/test/in-memory/in-memory-servant.repository'

export const fetchServants = async (page = 1) => {
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
