import { Either, right } from '@/root/core/main/either'
import { Servant } from '../../enterprise/servant'
import { ServantRepository } from '../repositories/servant.repository'

interface FetchAllServantsUseCaseRequest {
  page?: number
}

type FetchAllServantsUseCaseResponse = Either<
  null,
  {
    total: number
    next: number | null
    previous: number | null
    servants: Servant[]
  }
>

export class FetchAllServantsUseCase {
  constructor(private readonly servantRepository: ServantRepository) {}

  async execute({
    page = 1,
  }: FetchAllServantsUseCaseRequest): Promise<FetchAllServantsUseCaseResponse> {
    const { total, next, previous, servants } =
      await this.servantRepository.findAll(page)

    return right({
      total,
      next,
      previous,
      servants,
    })
  }
}
