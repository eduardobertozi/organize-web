import { InMemoryServantRepository } from '@/test/in-memory/in-memory-servant.repository'
import { CreateServantUseCase } from './create-servant.use-case'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { makeServant } from '@/test/factories/make-servant'

describe('Create Servant', () => {
  let inMemoryServantRepository: InMemoryServantRepository
  let sut: CreateServantUseCase

  beforeEach(() => {
    inMemoryServantRepository = new InMemoryServantRepository()
    sut = new CreateServantUseCase(inMemoryServantRepository)
  })

  it('should be able to create a new servant', async () => {
    const result = await sut.execute({
      name: 'Sample servant',
      productIds: [],
      productsPrice: 0,
      profitPercent: 0,
      workForcePrice: 0,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryServantRepository.items).toHaveLength(1)
    expect(inMemoryServantRepository.items[0].name).toBe('Sample servant')
  })

  it('should not be able create a servant with this already exists', async () => {
    await inMemoryServantRepository.create(
      makeServant({
        name: 'Sample servant',
      }),
    )

    const result = await sut.execute({
      name: 'Sample servant',
      productIds: [],
      productsPrice: 0,
      profitPercent: 0,
      workForcePrice: 0,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })
})
