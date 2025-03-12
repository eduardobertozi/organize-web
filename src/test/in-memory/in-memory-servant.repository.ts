import { UniqueEntityID } from '@/core/unique-entity-id'
import { ServantRepository } from '@/domain/servant/application/repositories/servant.repository'
import { Servant } from '@/domain/servant/enterprise/servant'

export class InMemoryServantRepository extends ServantRepository {
  public items: Servant[] = []

  constructor(overrideItems?: Servant[]) {
    super()
    this.items = overrideItems ?? []
  }

  async findById(id: UniqueEntityID) {
    return this.items.find((item) => item.id.equals(id)) ?? null
  }

  async findByName(name: string) {
    return this.items.find((item) => item.name === name) ?? null
  }

  async findAll(page = 1) {
    return this.items.slice((page - 1) * 10, page * 10)
  }

  async create(servant: Servant) {
    this.items.push(servant)
  }

  async save(servant: Servant): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(servant.id))

    if (index !== -1) {
      this.items[index] = servant
    }
  }

  async delete(servant: Servant): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(servant.id))

    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }
}
