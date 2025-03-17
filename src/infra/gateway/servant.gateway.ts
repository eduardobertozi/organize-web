import { UniqueEntityID } from '@/root/core/main/unique-entity-id'
import { HttpRepository } from '../http/repositories/http.repository'
import {
  ServantJson,
  ServantProps,
} from '@/root/core/domain/servant/enterprise/servant'
import { revalidatePath } from 'next/cache'

export class ServantGateway {
  private readonly baseUrl = 'http://localhost:8000'

  constructor(private readonly http: HttpRepository) {}

  async findById(id: UniqueEntityID) {
    const response = await this.http.get<ServantJson>({
      url: `${this.baseUrl}/servants/${id.toString()}`,
      cache: 'force-cache',
      next: {
        tags: ['servants'],
      },
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
      next: {
        tags: ['servants'],
      },
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
      next: {
        tags: ['servants'],
      },
    })

    return {
      total: response.total,
      next: response.next,
      previous: response.previous,
      servants: response.servants,
    }
  }

  async create(servant: ServantProps): Promise<void> {
    await this.http.post<void, ServantProps>({
      url: `${this.baseUrl}/servants`,
      data: servant,
    })

    revalidatePath('/servants')
  }

  async save(servant: Partial<ServantJson>): Promise<void> {
    await this.http.put<void, Partial<ServantJson>>({
      url: `${this.baseUrl}/servants/${servant.id}`,
      data: servant,
    })

    revalidatePath('/servants')
  }

  async delete(id: string) {
    await this.http.delete<void>({
      url: `${this.baseUrl}/servants/${id}`,
    })

    revalidatePath('/servants')
  }
}
