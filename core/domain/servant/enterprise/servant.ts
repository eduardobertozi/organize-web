import { Entity } from '@/root/core/main/entity'
import { Optional } from '@/root/core/main/optional'
import { UniqueEntityID } from '@/root/core/main/unique-entity-id'

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

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get productIds(): string[] {
    return this.props.productIds
  }

  set productIds(productIds: string[]) {
    this.props.productIds = productIds
    this.touch()
  }

  get productsPrice(): number {
    return this.props.productsPrice
  }

  set productsPrice(productsPrice: number) {
    this.props.productsPrice = productsPrice
    this.touch()
  }

  get workForcePrice(): number {
    return this.props.workForcePrice
  }

  set workForcePrice(workForcePrice: number) {
    this.props.workForcePrice = workForcePrice
    this.touch()
  }

  get profitPercent(): number {
    return this.props.profitPercent
  }

  set profitPercent(profitPercent: number) {
    this.props.profitPercent = profitPercent
    this.touch()
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.name.substring(0, 120).trim().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
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

export interface ServantJson extends ServantProps {
  id: string
}
