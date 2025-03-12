import debounce from 'lodash/debounce'
import { useCallback, useState } from 'react'

interface UsePaginatedItemsViewModelProps<T> {
  fetchItems: (page: number) => Promise<T[]>
  fetchFilteredItems: (searchText: string, page: number) => Promise<T[]>
  renderItem: (item: T) => React.ReactNode
}

export const usePaginatedItemsViewModel = <T,>({
  fetchItems,
  fetchFilteredItems,
  renderItem,
}: UsePaginatedItemsViewModelProps<T>) => {
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

  return {
    vm: {
      loading,
      hasMore,
      items,
      next,
      renderItem,
      debouncedHandleSearch,
    },
  }
}
