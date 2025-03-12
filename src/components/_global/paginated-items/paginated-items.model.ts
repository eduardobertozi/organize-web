export interface IUsePaginatedItemsViewModel<T> {
  vm: {
    loading: boolean
    hasMore: boolean
    items: T[]
    next: () => void
    renderItem: (item: T) => React.ReactNode
    debouncedHandleSearch: (text: string) => void
  }
}
