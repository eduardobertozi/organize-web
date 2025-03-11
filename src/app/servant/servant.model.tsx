import { IGlobal } from '@/context/global.model'

export interface IUseServantViewModel {
  vm: {
    context: IGlobal
    servantId: string
    changeServantId: (id: string) => void
  }
}
