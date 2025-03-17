'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
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
} from './actions'
import { CreateItem } from './create-item'
import { FindServant } from './find-servant'
import { FormServant } from './form'
import { ListItem } from './list-item'

type FetchServants = {
  total: number
  next: number | null
  previous: number | null
  servants: ServantJson[]
}

export const ListServants = () => {
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

  useEffect(() => {
    handleFetchAllServants()
  }, [])

  return (
    <div className="space-y-4">
      <FindServant handleSearch={handleFetchServantByName} />
      <CreateItem>
        <FormServant createServant={handleCreateServant} />
      </CreateItem>

      <ScrollArea className="relative h-[300px]">
        <div className="from-background absolute top-0 right-0 left-0 z-10 h-4 bg-gradient-to-b to-transparent" />
        <div className="from-background absolute right-0 bottom-0 left-0 z-10 h-10 bg-gradient-to-t to-transparent" />

        {isPending && <Skeleton className="mt-4 h-10 w-full" />}

        {servants?.servants?.map((servant) => (
          <ListItem
            name={servant.name}
            key={servant.id}
            handleDelete={() => handleDeleteServant(servant)}
          />
        ))}

        {servants?.next && (
          <Button
            onClick={() => handleFetchAllPaginatedServants(servants.next!)}
            variant="outline"
            className="z-20 my-10 w-full"
          >
            Ver mais
          </Button>
        )}
      </ScrollArea>

      <p className="text-xs text-zinc-300">
        Exibindo {servants?.servants.length} de {servants?.total} serviços
      </p>
    </div>
  )
}
