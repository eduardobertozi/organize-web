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
    servant: Servant
  }
>

export class FindServantByNameUseCase {
  constructor(private readonly servantRepository: ServantRepository) {}

  async execute({
    name,
  }: FindServantByNameUseCaseRequest): Promise<FindServantByNameUseCaseResponse> {
    const servant = await this.servantRepository.findByName(name)

    if (!servant) {
      return left(new NotFoundError())
    }

    return right({
      servant,
    })
  }
}
