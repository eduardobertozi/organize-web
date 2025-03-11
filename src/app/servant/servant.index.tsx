'use client'

import { useInitViewModel } from '@/hooks/use-init.view-model'
import { ServantView } from './servant.view'

export const Servant = () => {
  const viewModel = useInitViewModel()

  return <ServantView vm={viewModel.servant.vm} />
}
