import { Either, left, right } from '@/root/core/main/either'
import { ServantRepository } from '../repositories/servant.repository'
import { NotFoundError } from '@/root/core/main/errors/not-found.error'
import { Servant } from '../../enterprise/servant'
import { UniqueEntityID } from '@/root/core/main/unique-entity-id'

interface FindServantByIdUseCaseRequest {
  id: UniqueEntityID
}

type FindServantByIdUseCaseResponse = Either<
  NotFoundError,
  {
    servant: Servant
  }
>

export class FindServantByIdUseCase {
  constructor(private readonly servantRepository: ServantRepository) {}

  async execute({
    id,
  }: FindServantByIdUseCaseRequest): Promise<FindServantByIdUseCaseResponse> {
    const servant = await this.servantRepository.findById(id)

    if (!servant) {
      return left(new NotFoundError())
    }

    return right({
      servant,
    })
  }
}
