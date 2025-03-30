import { Servant } from '@/app/servants/servant.model'

export type FetchServants = {
  total: number
  next: number | null
  previous: number | null
  servants: Servant[]
}
