'use client'

import { InfiniteScroll } from '@/components/ui/expansions/infinite-scroll'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useSuppliersContext } from '../../context/suppliers.context'
import { CreateSupplier } from './create-supplier'
import { ListItem } from './list-item'
import { FindSupplier } from './find-supplier'

export const ListSuppliers = () => {
  const { suppliers, loading, hasMore, total, fetchSuppliers } =
    useSuppliersContext()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end">
        <FindSupplier className="flex-1" />
        <CreateSupplier />
      </div>

      <ScrollArea className="h-[300px]">
        {suppliers.map((supplier) => (
          <ListItem supplier={supplier} key={supplier.id} />
        ))}

        <InfiniteScroll
          hasMore={hasMore}
          isLoading={loading}
          next={fetchSuppliers}
          threshold={1}
        >
          {hasMore && <Skeleton className="h-12 w-full" />}
        </InfiniteScroll>
      </ScrollArea>
      <p className="text-xs text-zinc-300">
        Exibindo {suppliers.length} de {total} fornecedores
      </p>
    </div>
  )
}
