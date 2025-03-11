import { Either, left, right } from '@/core/either'
import { ServantRepository } from '../repositories/servant.repository'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { NotFoundError } from '@/core/errors/not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'

interface EditServantUseCaseRequest {
  id: UniqueEntityID
  name: string
  productIds: string[]
  productsPrice: number
  workForcePrice: number
  profitPercent: number
}

type EditServantUseCaseResponse = Either<
  AlreadyExistsError | NotFoundError,
  null
>

export class EditServantUseCase {
  constructor(private readonly servantRepository: ServantRepository) {}

  async execute(
    params: EditServantUseCaseRequest,
  ): Promise<EditServantUseCaseResponse> {
    const servantExists = await this.servantRepository.findById(params.id)

    if (!servantExists) {
      return left(new NotFoundError())
    }

    const newNameBelongsToAnotherExistandServant =
      await this.servantRepository.findByName(params.name)

    if (newNameBelongsToAnotherExistandServant) {
      return left(new AlreadyExistsError())
    }

    servantExists.name = params.name
    servantExists.productIds = params.productIds
    servantExists.productsPrice = params.productsPrice
    servantExists.profitPercent = params.profitPercent
    servantExists.workForcePrice = params.workForcePrice

    await this.servantRepository.save(servantExists)

    return right(null)
  }
}
