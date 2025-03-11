import { Entity } from '@/core/entity'
import { Optional } from '@/core/optional'
import { UniqueEntityID } from '@/core/unique-entity-id'

export interface ServantProps {
  name: string
  productIds: string[]
  productsPrice: number
  workForcePrice: number
  profitPercent: number
  createdAt: Date
  updatedAt?: Date | null
}

export class Servant extends Entity<ServantProps> {
  get name(): string {
    return this.props.name
  }

  get productIds(): string[] {
    return this.props.productIds
  }

  get productsPrice(): number {
    return this.props.productsPrice
  }

  get workForcePrice(): number {
    return this.props.workForcePrice
  }

  get profitPercent(): number {
    return this.props.profitPercent
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  static create(
    props: Optional<ServantProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): Servant {
    return new Servant(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
