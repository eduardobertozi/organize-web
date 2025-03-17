import {
  ServantJson,
  ServantProps,
} from '@/root/core/domain/servant/enterprise/servant'
import { debounce } from 'lodash'
import { useCallback, useEffect, useState, useTransition } from 'react'
import {
  createServant,
  deleteServant,
  fetchAllPaginatedServants,
  fetchAllServants,
  fetchServantByName,
  updateServant,
} from '../../servants.actions'
import { FetchServants } from './list-servants.types'

export const useListServants = () => {
  const [servants, setServants] = useState<FetchServants | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleFetchAllServants = async () => {
    startTransition(async () => {
      const response = await fetchAllServants()
      setServants(response)
    })
  }

  const handleFetchAllPaginatedServants = async (page: number) => {
    startTransition(async () => {
      const response = await fetchAllPaginatedServants(page)

      setServants((prev) => ({
        ...response,
        servants: [...prev!.servants, ...response.servants],
      }))
    })
  }

  const handleFetchServantByName = useCallback(
    // TODO: Implementar paginação em buscas por nome se vier mais de 10 itens

    debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
      startTransition(async () => {
        const response = await fetchServantByName(e.target.value)

        setServants((prev) => ({
          ...prev!,
          servants: response,
        }))
      })
    }, 800),
    [],
  )

  const handleDeleteServant = async (servant: ServantJson) => {
    startTransition(async () => {
      await deleteServant(servant)
      handleFetchAllServants()
    })
  }

  const handleCreateServant = async (servant: ServantProps) => {
    startTransition(async () => {
      await createServant(servant)
      handleFetchAllServants()
    })
  }

  const handleEditServant = async (servant: ServantProps) => {
    startTransition(async () => {
      await updateServant(servant)
      handleFetchAllServants()
    })
  }

  useEffect(() => {
    handleFetchAllServants()
  }, [])

  return {
    servants,
    isPending,
    handleFetchAllServants,
    handleFetchAllPaginatedServants,
    handleFetchServantByName,
    handleDeleteServant,
    handleCreateServant,
    handleEditServant,
  }
}
