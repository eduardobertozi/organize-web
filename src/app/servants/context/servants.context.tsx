'use client'

import {
  createServant,
  deleteServant,
  fetchAllServants,
  fetchServantByName,
  updateServant,
} from '@/actions/servants.actions'
import { Servant, ServantsRequest } from '@/@types/servants.types'
import { debounce, DebouncedFunc } from 'lodash'
import {
  createContext,
  useCallback,
  useContext,
  useState,
  useTransition,
} from 'react'
import { toast } from 'sonner'

type ServantsContextProps = {
  servants: Servant[]
  page: number
  hasMore: boolean
  total: number
  loading: boolean
  fetchServantsByName: DebouncedFunc<(name: string) => Promise<void>>
  fetchServants: () => Promise<void>
  reloadServants: () => Promise<void>
  createNewServant: (servant: ServantsRequest) => Promise<void>
  updateOneServant: (servant: ServantsRequest) => Promise<void>
  deleteOneServant: (servantId: string) => Promise<void>
}

const ServantsContext = createContext<ServantsContextProps>(
  {} as ServantsContextProps,
)

export const ServantsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)
  const [loading, startTransition] = useTransition()
  const [servants, setServants] = useState<Servant[]>([])

  const fetchServantsByName = useCallback(
    debounce(async (name: string) => {
      startTransition(async () => {
        const { servants, total, next } = await fetchServantByName(name, 1)
        const hasMoreServants = !!next

        console.log(servants, 'SERVANTS NAME')

        setServants(servants)
        setPage(1)
        setTotal(total)
        setHasMore(hasMoreServants)
      })
    }, 300),
    [],
  )

  const fetchServants = async () => {
    startTransition(async () => {
      const { servants, total, next } = await fetchAllServants(page)
      const hasMoreServants = !!next

      setServants((prev) => [...prev, ...servants])
      setPage((prev) => prev + 1)
      setTotal(total)
      setHasMore(hasMoreServants)
    })
  }

  const reloadServants = async () => {
    startTransition(async () => {
      const { servants, total, next } = await fetchAllServants(1)
      const hasMoreServants = !!next

      setServants(servants)
      setPage(1)
      setTotal(total)
      setHasMore(hasMoreServants)
    })
  }

  const createNewServant = async (servant: ServantsRequest) => {
    startTransition(async () => {
      try {
        const { message } = await createServant(servant)
        toast.success(message)
      } catch (err) {
        const { message } = err as Error
        toast.error(message)
      }
    })
  }

  const updateOneServant = async (servant: ServantsRequest) => {
    startTransition(async () => {
      try {
        await updateServant(servant)
        toast.success('Serviço atualizado com sucesso!')
      } catch (err) {
        const { message } = err as Error
        toast.error(message)
      }
    })
  }

  const deleteOneServant = async (servantId: string) => {
    startTransition(async () => {
      try {
        await deleteServant(servantId)
        await reloadServants()
      } catch (err) {
        const { message } = err as Error
        toast.error(message)
      }
    })
  }

  return (
    <ServantsContext.Provider
      value={{
        servants,
        page,
        hasMore,
        total,
        loading,
        fetchServantsByName,
        fetchServants,
        reloadServants,
        createNewServant,
        updateOneServant,
        deleteOneServant,
      }}
    >
      {children}
    </ServantsContext.Provider>
  )
}

export const useServantsContext = () => {
  const context = useContext(ServantsContext)
  return context
}
