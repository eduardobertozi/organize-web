import { Either, left, right } from '@/root/core/main/either'
import { AlreadyExistsError } from '@/root/core/main/errors/already-exists.error'
import { NotFoundError } from '@/root/core/main/errors/not-found.error'
import { UniqueEntityID } from '@/root/core/main/unique-entity-id'
import { ServantRepository } from '../repositories/servant.repository'

interface DeleteServantUseCaseRequest {
  id: UniqueEntityID
  name: string
  productIds: string[]
  productsPrice: number
  workForcePrice: number
  profitPercent: number
}

type DeleteServantUseCaseResponse = Either<
  AlreadyExistsError | NotFoundError,
  null
>

export class DeleteServantUseCase {
  constructor(private readonly servantRepository: ServantRepository) {}

  async execute(
    params: DeleteServantUseCaseRequest,
  ): Promise<DeleteServantUseCaseResponse> {
    const servantExists = await this.servantRepository.findById(params.id)

    if (!servantExists) {
      return left(new NotFoundError())
    }

    await this.servantRepository.delete(servantExists)

    return right(null)
  }
}
