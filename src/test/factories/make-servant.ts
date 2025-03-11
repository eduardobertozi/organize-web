import { UniqueEntityID } from '@/core/unique-entity-id'
import { Servant, ServantProps } from '@/domain/servant/enterprise/servant'
import { faker } from '@faker-js/faker'

export function makeServant(
  override: Partial<ServantProps> = {},
  id?: UniqueEntityID,
) {
  return Servant.create(
    {
      name: faker.lorem.sentence(),
      productIds: [],
      productsPrice: faker.number.float(),
      profitPercent: faker.number.int(),
      workForcePrice: faker.number.int(),
      ...override,
    },
    id,
  )
}
