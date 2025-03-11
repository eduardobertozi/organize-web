import { NotFoundError } from '@/core/errors/not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { makeServant } from '@/test/factories/make-servant'
import { InMemoryServantRepository } from '@/test/in-memory/in-memory-servant.repository'
import { FindServantByIdUseCase } from './find-servant-by-id.use-case'

describe('Find Servant By Id', () => {
  let inMemoryServantRepository: InMemoryServantRepository
  let sut: FindServantByIdUseCase

  beforeEach(() => {
    inMemoryServantRepository = new InMemoryServantRepository()
    sut = new FindServantByIdUseCase(inMemoryServantRepository)
  })

  it('should be able to find servant by id', async () => {
    const servant = makeServant(
      {
        name: 'Sample servant',
      },
      new UniqueEntityID('123456'),
    )

    await inMemoryServantRepository.create(servant)

    const result = await sut.execute({
      id: new UniqueEntityID('123456'),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryServantRepository.items).toHaveLength(1)
  })

  it('should return error when servant not exists', async () => {
    const result = await sut.execute({
      id: new UniqueEntityID('123456'),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundError)
  })
})
