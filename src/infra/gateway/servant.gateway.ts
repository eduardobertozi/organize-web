import {
  Servant,
  ServantJson,
} from '@/root/core/domain/servant/enterprise/servant'
import { UniqueEntityID } from '@/root/core/main/unique-entity-id'
import { HttpRepository } from '../http/repositories/http.repository'

export class ServantGateway {
  private readonly baseUrl = 'http://localhost:3000/api'

  constructor(private readonly http: HttpRepository) {}

  async findById(id: UniqueEntityID) {
    const response = await this.http.get<ServantJson>({
      url: `${this.baseUrl}/servants/${id.toString()}`,
      cache: 'force-cache',
    })

    if (!response) {
      return null
    }

    return response
  }

  async findByName(name: string, page?: number) {
    const response = await this.http.get<{ servants: ServantJson[] }>({
      url: `${this.baseUrl}/servants?q=${name}&page=${page ?? 1}`,
      cache: 'force-cache',
    })

    if (!response) {
      return []
    }

    return response.servants
  }

  async findAll(page?: number) {
    const response = await this.http.get<{
      total: number
      next: number | null
      previous: number | null
      servants: ServantJson[]
    }>({
      url: `${this.baseUrl}/servants?page=${page ?? 1}`,
      cache: 'force-cache',
    })

    return {
      total: response.total,
      next: response.next,
      previous: response.previous,
      servants: response.servants,
    }
  }

  async create(servant: Servant): Promise<void> {
    await this.http.post<void, ServantJson>({
      url: `${this.baseUrl}/servants`,
      data: servant.toJSON(),
      next: {
        revalidate: 0,
      },
    })
  }

  async save(servant: Servant): Promise<void> {
    await this.http.put<void, ServantJson>({
      url: `${this.baseUrl}/servants`,
      data: servant.toJSON(),
      next: {
        revalidate: 0,
      },
    })
  }

  async delete(servant: ServantJson) {
    await this.http.delete<void, ServantJson>({
      url: `${this.baseUrl}/servants`,
      data: servant,
      next: {
        revalidate: 0,
      },
    })
  }
}
