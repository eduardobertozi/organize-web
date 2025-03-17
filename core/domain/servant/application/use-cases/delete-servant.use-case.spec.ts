import { makeServant } from '@/root/core/test/factories/make-servant'
import { InMemoryServantRepository } from '@/root/core/test/in-memory/in-memory-servant.repository'
import { DeleteServantUseCase } from './delete-servant.use-case'
import { UniqueEntityID } from '@/root/core/main/unique-entity-id'
import { NotFoundError } from '@/root/core/main/errors/not-found.error'

describe('Delete Servant', () => {
  let inMemoryServantRepository: InMemoryServantRepository
  let sut: DeleteServantUseCase

  beforeEach(() => {
    inMemoryServantRepository = new InMemoryServantRepository()
    sut = new DeleteServantUseCase(inMemoryServantRepository)
  })

  it('should be able to delete a existant servant', async () => {
    const servant = makeServant({}, new UniqueEntityID('1'))

    await inMemoryServantRepository.create(servant)

    const result = await sut.execute({
      id: new UniqueEntityID('1'),
      name: 'Sample servant',
      productIds: [],
      productsPrice: 0,
      profitPercent: 0,
      workForcePrice: 0,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryServantRepository.items).toHaveLength(0)
  })

  it('should not be able delete him when this does not exist', async () => {
    const result = await sut.execute({
      id: new UniqueEntityID('123456'),
      name: 'Sample servant',
      productIds: [],
      productsPrice: 0,
      profitPercent: 0,
      workForcePrice: 0,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundError)
  })
})
