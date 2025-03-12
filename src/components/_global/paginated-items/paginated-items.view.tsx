'use client'

import {
  FloatingInput,
  FloatingLabel,
} from '@/components/ui/expansions/floating-label-input'
import InfiniteScroll from '@/components/ui/expansions/infinite-scroll'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useCallback, useState } from 'react'
import debounce from 'lodash/debounce'

interface PaginatedItemsViewProps<T> {
  fetchItems: (page: number) => Promise<T[]>
  fetchFilteredItems: (searchText: string, page: number) => Promise<T[]>
  renderItem: (item: T) => React.ReactNode
}

export const PaginatedItemsView = <T,>({
  fetchItems,
  fetchFilteredItems,
  renderItem,
}: PaginatedItemsViewProps<T>) => {
  /* TODO: Separate ViewModel and Model Layers */
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [items, setItems] = useState<T[]>([])
  const [searchText, setSearchText] = useState('')

  const next = async () => {
    setLoading(true)

    setTimeout(async () => {
      const items = searchText
        ? await fetchFilteredItems(searchText, page)
        : await fetchItems(page)
      setItems((prev) => [...prev, ...items])
      setPage((prev) => prev + 1)

      if (items.length < 3) {
        setHasMore(false)
      }
      setLoading(false)
    }, 800)
  }

  const handleSearch = async (text: string) => {
    setSearchText(text)
    setPage(1)
    setItems([])
    setHasMore(true)
    setLoading(true)

    const items = await fetchFilteredItems(text, 1)
    setItems(items)
    setLoading(false)
    if (items.length < 3) {
      setHasMore(false)
    }
  }

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 500), [])

  return (
    <div className="space-y-4">
      <div className="relative w-full">
        <FloatingInput
          id="floating-customize"
          onChange={(e) => debouncedHandleSearch(e.target.value)}
        />
        <FloatingLabel htmlFor="floating-customize">
          Buscar Serviço
        </FloatingLabel>
      </div>
      <ScrollArea className="relative h-[500px] w-full">
        <div className="from-background absolute top-0 right-0 left-0 z-10 h-4 bg-gradient-to-b to-transparent"></div>
        <div className="from-background absolute right-0 bottom-0 left-0 z-10 h-24 bg-gradient-to-t to-transparent"></div>
        <div className="relative z-0 flex w-full flex-col items-center">
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
    </div>
  )
}
