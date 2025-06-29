'use client'

import { InfiniteScroll } from '@/components/ui/expansions/infinite-scroll'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useServantsContext } from '../../context/servants.context'
import { CreateServant } from './create-servant'
import { ListItem } from './list-item'
import { FindServant } from './find-servant'

export const ListServants = () => {
  const { servants, loading, hasMore, total, fetchServants } =
    useServantsContext()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end">
        <FindServant className="flex-1" />
        <CreateServant />
      </div>

      <ScrollArea className="h-[300px]">
        {servants.map((servant) => (
          <ListItem servant={servant} key={servant.id} />
        ))}

        <InfiniteScroll
          hasMore={hasMore}
          isLoading={loading}
          next={fetchServants}
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
