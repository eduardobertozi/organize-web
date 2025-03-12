import { Either, left, right } from '@/core/either'
import { NotFoundError } from '@/core/errors/not-found.error'
import { Servant } from '../../enterprise/servant'
import { ServantRepository } from '../repositories/servant.repository'

interface FindServantByNameUseCaseRequest {
  name: string
}

type FindServantByNameUseCaseResponse = Either<
  NotFoundError,
  {
    servants: Servant[]
  }
>

export class FindServantByNameUseCase {
  constructor(private readonly servantRepository: ServantRepository) {}

  async execute({
    name,
  }: FindServantByNameUseCaseRequest): Promise<FindServantByNameUseCaseResponse> {
    const servants = await this.servantRepository.findByName(name)

    if (!servants || servants.length < 1) {
      return left(new NotFoundError())
    }

    return right({
      servants,
    })
  }
}
