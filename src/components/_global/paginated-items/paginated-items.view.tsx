'use client'

import {
  FloatingInput,
  FloatingLabel,
} from '@/components/ui/expansions/floating-label-input'
import InfiniteScroll from '@/components/ui/expansions/infinite-scroll'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { IUsePaginatedItemsViewModel } from './paginated-items.model'

export const PaginatedItemsView = <T,>({
  vm,
}: IUsePaginatedItemsViewModel<T>) => {
  return (
    <div className="space-y-4">
      <div className="relative w-full">
        <FloatingInput
          id="floating-customize"
          onChange={(e) => vm.debouncedHandleSearch(e.target.value)}
        />
        <FloatingLabel htmlFor="floating-customize">
          Buscar Serviço
        </FloatingLabel>
      </div>
      <ScrollArea className="relative h-[500px] w-full">
        <div className="from-background absolute top-0 right-0 left-0 z-10 h-4 bg-gradient-to-b to-transparent"></div>
        <div className="from-background absolute right-0 bottom-0 left-0 z-10 h-24 bg-gradient-to-t to-transparent"></div>
        <div className="relative z-0 flex w-full flex-col items-center">
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
    </div>
  )
}
