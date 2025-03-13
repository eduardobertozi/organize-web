export interface IUsePaginatedItemsViewModel<T> {
  vm: {
    header?: React.ReactNode
    loading: boolean
    hasMore: boolean
    items: T[]
    next: () => void
    renderItem: (item: T) => React.ReactNode
    debouncedHandleSearch: (text: string) => void
  }
}
