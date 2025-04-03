'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { PlusIcon } from 'lucide-react'
import { ListItem } from '../acessories/list-item'
import { useState, useTransition } from 'react'
import { Servant } from '@/types/servants.types'
import { fetchAllServants } from '@/actions/servants.actions'
import { InfiniteScroll } from '@/components/ui/expansions/infinite-scroll'
import { Skeleton } from '@/components/ui/skeleton'
import { FormServant } from '../form-servant/form-servant'

export const ListServants = () => {
  const [page, setPage] = useState(1)
  const [servants, setServants] = useState<Servant[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)
  const [loading, startTransition] = useTransition()

  const next = () => {
    startTransition(async () => {
      const response = await fetchAllServants(page)

      setServants((prev) => [...prev, ...response.servants])
      setPage((prev) => prev + 1)
      setTotal(response.total)
      setHasMore(response.total > servants.length)
    })
  }

  return (
    <div className="space-y-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto">
            Novo <PlusIcon size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="p-4">
          <SheetHeader>
            <SheetTitle>Serviço</SheetTitle>
            <SheetDescription>
              Adicione, edite ou exclua um serviço.
            </SheetDescription>
          </SheetHeader>
          <FormServant />
        </SheetContent>
      </Sheet>

      <ScrollArea className="max-h-[300px]">
        {servants.map((servant) => (
          <ListItem
            servant={servant}
            key={servant.id}
            deleteServant={() =>
              console.log(`Deletando serviço ${servant.name}`)
            }
          />
        ))}

        <InfiniteScroll
          hasMore={hasMore}
          isLoading={loading}
          next={next}
          threshold={1}
        >
          {hasMore && <Skeleton className="h-12 w-full" />}
        </InfiniteScroll>
      </ScrollArea>
      <p className="text-xs text-zinc-300">
        Exibindo {servants.length} de {total} serviços
      </p>
    </div>
  )
}
