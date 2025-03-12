'use client'

import { IUseInitProps } from '@/hooks/use-init.model'
import { useState } from 'react'
import { fetchServants, findFilteredServants } from './servant.actions'
import { IUseServantViewModel } from './servant.model'

export const useServantViewModel = ({
  context,
}: IUseInitProps): IUseServantViewModel => {
  const [servantCount, setServantCount] = useState(0)

  const getServants = async (page: number) => {
    const items = await fetchServants(page)
    setServantCount((count) => count + items.length)

    return items
  }

  const getFilteredServants = async (searchText: string, page: number) => {
    const items = await findFilteredServants(searchText, page)
    setServantCount((count) => count + items.length)

    return items
  }

  return {
    vm: {
      context,
      servantCount,
      getServants,
      getFilteredServants,
    },
  }
}
