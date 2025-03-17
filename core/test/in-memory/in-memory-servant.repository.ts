import { UniqueEntityID } from '@/root/core/main/unique-entity-id'
import { ServantRepository } from '@/root/core/domain/servant/application/repositories/servant.repository'
import { Servant } from '@/root/core/domain/servant/enterprise/servant'

export class InMemoryServantRepository extends ServantRepository {
  public items: Servant[] = []

  async findById(id: UniqueEntityID) {
    return this.items.find((item) => item.id.equals(id)) ?? null
  }

  async findByName(name: string, page = 1) {
    const filteredItems = this.items.filter((item) => item.name?.includes(name))
    return filteredItems.slice((page - 1) * 10, page * 10)
  }

  async findAll(page = 1) {
    const servants = this.items.slice((page - 1) * 10, page * 10)

    return {
      total: this.items.length,
      next: page * 10 < this.items.length ? page + 1 : null,
      previous: page > 1 ? page - 1 : null,
      servants,
    }
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
