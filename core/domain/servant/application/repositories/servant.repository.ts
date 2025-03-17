import { UniqueEntityID } from '@/root/core/main/unique-entity-id'
import { Servant } from '../../enterprise/servant'

export abstract class ServantRepository {
  abstract findById(id: UniqueEntityID): Promise<Servant | null>
  abstract findByName(name: string, page?: number): Promise<Servant[]>
  abstract findAll(page: number): Promise<{
    total: number
    next: number | null
    previous: number | null
    servants: Servant[]
  }>
  abstract create(servant: Servant): Promise<void>
  abstract save(servant: Servant): Promise<void>
  abstract delete(servant: Servant): Promise<void>
}
