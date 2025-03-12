import { IGlobal } from '@/context/global.model'
import { ServantProps } from '@/domain/servant/enterprise/servant'

export interface ServantToJson extends ServantProps {
  id: string
}

export interface IUseServantViewModel {
  vm: {
    context: IGlobal
    servantCount: number
    getServants: (page: number) => Promise<ServantToJson[]>
    getFilteredServants: (
      searchText: string,
      page: number,
    ) => Promise<ServantToJson[]>
  }
}
