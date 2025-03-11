'use client'

import { IUseInitProps } from '@/hooks/use-init.model'
import { useState } from 'react'
import { IUseServantViewModel } from './servant.model'

export const useServantViewModel = ({
  context,
}: IUseInitProps): IUseServantViewModel => {
  const [servantId, setServantId] = useState('')

  const changeServantId = (id: string) => {
    setServantId(id)
  }

  return {
    vm: {
      context,
      servantId,
      changeServantId,
    },
  }
}
