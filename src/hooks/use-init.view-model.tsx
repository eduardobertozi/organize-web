'use client'

import { useServantViewModel } from '@/app/servant/servant.view-model'
import { useGlobalContext } from '@/context/global'
import { IUseInitViewModel } from './use-init.model'

export const useInitViewModel = (): IUseInitViewModel => {
  const context = useGlobalContext()

  return {
    servant: useServantViewModel({ context }),
  }
}
