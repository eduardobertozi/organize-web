import { Either, right } from '@/root/core/main/either'
import { Servant } from '../../enterprise/servant'
import { ServantRepository } from '../repositories/servant.repository'

interface FindServantByNameUseCaseRequest {
  name: string
  page?: number
}

type FindServantByNameUseCaseResponse = Either<
  null,
  {
    servants: Servant[]
  }
>

export class FindServantByNameUseCase {
  constructor(private readonly servantRepository: ServantRepository) {}

  async execute({
    name,
    page = 1,
  }: FindServantByNameUseCaseRequest): Promise<FindServantByNameUseCaseResponse> {
    const servants = await this.servantRepository.findByName(name, page)

    return right({
      servants,
    })
  }
}
