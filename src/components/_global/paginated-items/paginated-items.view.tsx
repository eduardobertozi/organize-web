'use client'

import InfiniteScroll from '@/components/ui/expansions/infinite-scroll'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useState } from 'react'

interface PaginatedItemsViewProps<T> {
  fetchItems: (page: number) => Promise<T[]>
  renderItem: (item: T) => React.ReactNode
}

export const PaginatedItemsView = <T,>({
  fetchItems,
  renderItem,
}: PaginatedItemsViewProps<T>) => {
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [items, setItems] = useState<T[]>([])

  const next = async () => {
    setLoading(true)

    setTimeout(async () => {
      const items = await fetchItems(page)
      setItems((prev) => [...prev, ...items])
      setPage((prev) => prev + 1)

      if (items.length < 3) {
        setHasMore(false)
      }
      setLoading(false)
    }, 800)
  }

  return (
    <ScrollArea className="h-[500px] w-full">
      <div className="flex w-full flex-col items-center">
        {items.map((item) => renderItem(item))}
        <InfiniteScroll
          hasMore={hasMore}
          isLoading={loading}
          next={next}
          threshold={1}
        >
          {hasMore && <Skeleton className="my-4 h-10 w-full" />}
        </InfiniteScroll>
      </div>
    </ScrollArea>
  )
}
