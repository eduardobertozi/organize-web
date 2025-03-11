import { NotFoundError } from '@/core/errors/not-found.error'
import { makeServant } from '@/test/factories/make-servant'
import { InMemoryServantRepository } from '@/test/in-memory/in-memory-servant.repository'
import { FindServantByNameUseCase } from './find-servant-by-name.use-case'

describe('Find Servant By Name', () => {
  let inMemoryServantRepository: InMemoryServantRepository
  let sut: FindServantByNameUseCase

  beforeEach(() => {
    inMemoryServantRepository = new InMemoryServantRepository()
    sut = new FindServantByNameUseCase(inMemoryServantRepository)
  })

  it('should be able to find servant by name', async () => {
    const servant = makeServant({
      name: 'Sample servant',
    })

    await inMemoryServantRepository.create(servant)

    const result = await sut.execute({
      name: 'Sample servant',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryServantRepository.items).toHaveLength(1)
  })

  it('should return error when servant not exists', async () => {
    const result = await sut.execute({
      name: 'Sample servant',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundError)
  })
})
