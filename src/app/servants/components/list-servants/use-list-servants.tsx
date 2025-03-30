import { debounce } from 'lodash'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { FetchServants } from './list-servants.types'
import { Servant, ServantRequest } from '../../servant.model'
import {
  createServant,
  deleteServant,
  fetchAllServants,
  fetchServantByName,
  updateServant,
} from '../../servants.actions'

export const useListServants = () => {
  const [servantsResponse, setServantsResponse] =
    useState<FetchServants | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleFetchAllServants = async (page?: number | null) => {
    startTransition(async () => {
      const data = await fetchAllServants(page ?? 1)
      setServantsResponse(data)
    })
  }

  const handleFetchServantByName = useCallback(
    debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
      startTransition(async () => {
        const name = e.target.value
        const data = await fetchServantByName(name)

        setServantsResponse(data)
      })
    }, 800),
    [],
  )

  const handleCreateServant = async (servant: ServantRequest) => {
    startTransition(async () => {
      await createServant(servant)
      await handleFetchAllServants()
    })
  }

  const handleEditServant = async (servant: Servant) => {
    startTransition(async () => {
      await updateServant(servant)
      await handleFetchAllServants()
    })
  }

  const handleDeleteServant = async ({ id }: Servant) => {
    startTransition(async () => {
      await deleteServant(id)
      await handleFetchAllServants()
    })
  }

  useEffect(() => {
    void handleFetchAllServants()
  }, [])

  return {
    servantsResponse,
    isPending,
    handleFetchAllServants,
    handleFetchServantByName,
    handleDeleteServant,
    handleCreateServant,
    handleEditServant,
  }
}
