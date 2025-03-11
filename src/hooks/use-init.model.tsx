import { IUseServantViewModel } from '@/app/servant/servant.model'
import { IGlobal } from '@/context/global.model'

export interface IUseInitProps {
  context: IGlobal
  // api: IUseApiService
}

export interface IUseInitViewModel {
  servant: IUseServantViewModel
}
