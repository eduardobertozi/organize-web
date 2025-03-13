import { ServantRepository } from '@/domain/servant/application/repositories/servant.repository'
import { HttpRepository } from '../http/repositories/http.repository'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Servant } from '@/domain/servant/enterprise/servant'
import { ServantToJson } from '@/app/servant/servant.model'

export class ServantGateway implements ServantRepository {
  private readonly baseUrl = 'http://localhost:3000/api'

  constructor(private readonly http: HttpRepository) {}

  async findById(id: UniqueEntityID): Promise<Servant | null> {
    const response = await this.http.get<ServantToJson>({
      url: `${this.baseUrl}/servants/${id.toString()}`,
      cache: 'force-cache',
    })

    if (!response) {
      return null
    }

    return Servant.create(response, new UniqueEntityID(response.id))
  }

  async findByName(name: string, page?: number): Promise<Servant[]> {
    const response = await this.http.get<{ servants: ServantToJson[] }>({
      url: `${this.baseUrl}/servants?name=${name}&page=${page}`,
    })

    if (!response) {
      return []
    }

    return response.servants.map((servant) =>
      Servant.create(servant, new UniqueEntityID(servant.id)),
    )
  }

  async findAll(page: number): Promise<Servant[]> {
    const response = await this.http.get<{ servants: ServantToJson[] }>({
      url: `${this.baseUrl}/servants?page=${page}`,
    })

    return response.servants.map((servant) =>
      Servant.create(servant, new UniqueEntityID(servant.id)),
    )
  }

  async create(servant: Servant): Promise<void> {
    await this.http.post<void, ServantToJson>({
      url: `${this.baseUrl}/servants`,
      data: servant.toJSON(),
    })
  }

  async save(servant: Servant): Promise<void> {
    await this.http.put<void, ServantToJson>({
      url: `${this.baseUrl}/servants`,
      data: servant.toJSON(),
    })
  }

  async delete(servant: Servant): Promise<void> {
    await this.http.delete<void>({
      url: `${this.baseUrl}/servants/${servant.id.toString()}`,
    })
  }
}
