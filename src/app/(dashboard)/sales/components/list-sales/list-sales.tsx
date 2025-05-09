'use client'

import { InfiniteScroll } from '@/components/ui/expansions/infinite-scroll'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { ListItem } from './list-item'
import { CreateSale } from './create-sale'
import { useSalesContext } from '../context/sales.context'

export const ListSales = () => {
  const { sales, loading, hasMore, total, fetchSales } = useSalesContext()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end">
        <CreateSale />
      </div>

      <div className="grid">
        <ScrollArea className="max-h-52 sm:max-h-[300px]">
          {sales.map((sale) => (
            <ListItem sale={sale} key={sale.id} />
          ))}

          <InfiniteScroll
            hasMore={hasMore}
            isLoading={loading}
            next={fetchSales}
            threshold={1}
          >
            {hasMore && <Skeleton className="h-12 w-full" />}
          </InfiniteScroll>
        </ScrollArea>
      </div>
      <p className="text-xs text-zinc-300">
        Exibindo {sales.length} de {total} produtos
      </p>
    </div>
  )
}
