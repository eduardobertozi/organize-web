import { makeServant } from '@/test/factories/make-servant'
import { InMemoryServantRepository } from '@/test/in-memory/in-memory-servant.repository'
import { FetchAllServantsUseCase } from './fetch-all-servants.use-case'

describe('Fetch All Servants', () => {
  let inMemoryServantRepository: InMemoryServantRepository
  let sut: FetchAllServantsUseCase

  beforeEach(() => {
    inMemoryServantRepository = new InMemoryServantRepository()
    sut = new FetchAllServantsUseCase(inMemoryServantRepository)
  })

  it('should be able to fetch all servants', async () => {
    for (let i = 0; i < 12; i++) {
      inMemoryServantRepository.create(makeServant())
    }

    const result = await sut.execute({})

    expect(result.isRight()).toBe(true)
    expect(inMemoryServantRepository.items).toHaveLength(12)
  })

  it('should be able to fetch all servants with ten items per page', async () => {
    for (let i = 0; i < 12; i++) {
      inMemoryServantRepository.create(makeServant())
    }

    const result1 = await sut.execute({
      page: 1,
    })

    expect(result1.isRight()).toBe(true)
    expect(result1.value?.servants).toHaveLength(10)

    const result2 = await sut.execute({
      page: 2,
    })

    expect(result2.isRight()).toBe(true)
    expect(result2.value?.servants).toHaveLength(2)
  })
})
