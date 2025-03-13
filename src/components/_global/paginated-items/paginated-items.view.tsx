'use client'

import {
  FloatingInput,
  FloatingLabel,
} from '@/components/ui/expansions/floating-label-input'
import InfiniteScroll from '@/components/ui/expansions/infinite-scroll'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { IUsePaginatedItemsViewModel } from './paginated-items.model'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

export const PaginatedItemsView = <T,>({
  vm,
}: IUsePaginatedItemsViewModel<T>) => {
  return (
    <div>
      <div className="flex w-full flex-col items-center gap-2 sm:flex-row">
        <div className="relative w-full">
          <FloatingInput
            id="floating-customize"
            onChange={(e) => vm.debouncedHandleSearch(e.target.value)}
            className="flex-1"
          />
          <FloatingLabel htmlFor="floating-customize">
            Buscar Serviço
          </FloatingLabel>
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          Novo <PlusIcon size={24} />
        </Button>
      </div>
      <ScrollArea className="relative mt-8 h-[300px] min-h-[300px] w-full">
        <div className="from-background absolute top-0 right-0 left-0 z-10 h-4 bg-gradient-to-b to-transparent" />
        <div className="from-background absolute right-0 bottom-0 left-0 z-10 h-10 bg-gradient-to-t to-transparent" />
        <div className="relative z-0 flex w-full flex-col">
          {vm.items.map((item) => vm.renderItem(item))}

          <InfiniteScroll
            hasMore={vm.hasMore}
            isLoading={vm.loading}
            next={vm.next}
            threshold={1}
          >
            {vm.hasMore && <Skeleton className="my-4 h-10 w-full" />}
          </InfiniteScroll>
        </div>
      </ScrollArea>

      <p className="p-2 pt-4 text-end text-xs">
        Exibindo {vm.items.length} itens
      </p>
    </div>
  )
}
