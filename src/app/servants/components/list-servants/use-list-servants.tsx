import { debounce } from 'lodash'
import { useCallback, useEffect, useTransition } from 'react'
import { toast } from 'sonner'
import { Servant, ServantRequest } from '../../servant.model'
import {
  createServant,
  deleteServant,
  fetchAllServants,
  fetchServantByName,
  updateServant,
} from '../../servants.actions'
import { useServantsContext } from '../../servants.context'

export const useListServants = () => {
  const { servantsResponse, changeServantsResponse } = useServantsContext()
  const [isPending, startTransition] = useTransition()

  const handleFetchAllServants = async (page?: number | null) => {
    startTransition(async () => {
      const data = await fetchAllServants(page ?? 1)
      changeServantsResponse(data)
    })
  }

  const handleFetchServantByName = useCallback(
    debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
      startTransition(async () => {
        const name = e.target.value
        const data = await fetchServantByName(name)

        changeServantsResponse(data)
      })
    }, 800),
    [],
  )

  const handleCreateServant = (servant: ServantRequest) => {
    startTransition(async () => {
      try {
        const { message } = await createServant(servant)
        await handleFetchAllServants()
        toast.success(message)
      } catch (err) {
        const error = err as Error
        toast.error(error.message)
      }
    })
  }

  const handleEditServant = (servant: Servant) => {
    startTransition(async () => {
      startTransition(async () => {
        try {
          const { message } = await updateServant(servant)
          await handleFetchAllServants()
          toast.success(message)
        } catch (err) {
          const error = err as Error
          toast.error(error.message)
        }
      })
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
