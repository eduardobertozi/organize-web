import { Servant } from '@/domain/servant/enterprise/servant'
import * as fs from 'fs'
import * as path from 'path'

export const servantsData = () => {
  return {
    servants: Array.from({ length: 100 }, (_, index) =>
      Servant.create({
        name: `Servant ${index}`,
        productIds: ['product-1'],
        productsPrice: 100,
        profitPercent: 10,
        workForcePrice: 10,
      }).toJSON(),
    ),
  }
}

const data = servantsData()
const filePath = path.join(__dirname, 'servants.json')
fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
