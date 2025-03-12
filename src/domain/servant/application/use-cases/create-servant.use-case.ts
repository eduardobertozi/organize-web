import { Either, left, right } from '@/core/either'
import { Servant } from '../../enterprise/servant'
import { ServantRepository } from '../repositories/servant.repository'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'

interface CreateServantUseCaseRequest {
  name: string
  productIds: string[]
  productsPrice: number
  workForcePrice: number
  profitPercent: number
}

type CreateServantUseCaseResponse = Either<AlreadyExistsError, null>

export class CreateServantUseCase {
  constructor(private readonly servantRepository: ServantRepository) {}

  async execute(
    params: CreateServantUseCaseRequest,
  ): Promise<CreateServantUseCaseResponse> {
    const servant = Servant.create(params)
    const servantExists = await this.servantRepository.findByName(servant.name)

    if (!servantExists || servantExists.length > 0) {
      return left(new AlreadyExistsError())
    }

    await this.servantRepository.create(servant)

    return right(null)
  }
}
