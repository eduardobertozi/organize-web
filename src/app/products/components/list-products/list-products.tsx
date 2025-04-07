'use client'

import { InfiniteScroll } from '@/components/ui/expansions/infinite-scroll'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useProductsContext } from '../../context/products.context'
import { CreateServant } from './create-product'
import { ListItem } from './list-item'
import { FindProduct } from './find-product'

export const ListProducts = () => {
  const { products, loading, hasMore, total, fetchProducts } =
    useProductsContext()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end">
        <FindProduct className="flex-1" />
        <CreateServant />
      </div>

      <ScrollArea className="h-[300px]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <ListItem product={product} key={product.id} />
          ))}
        </div>

        <InfiniteScroll
          hasMore={hasMore}
          isLoading={loading}
          next={fetchProducts}
          threshold={1}
        >
          {hasMore && <Skeleton className="h-12 w-full" />}
        </InfiniteScroll>
      </ScrollArea>
      <p className="text-xs text-zinc-300">
        Exibindo {products.length} de {total} produtos
      </p>
    </div>
  )
}
