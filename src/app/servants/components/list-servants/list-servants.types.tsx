import { ServantJson } from '@/root/core/domain/servant/enterprise/servant'

export type FetchServants = {
  total: number
  next: number | null
  previous: number | null
  servants: ServantJson[]
}
