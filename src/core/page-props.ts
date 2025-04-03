export type PageProps<
  TParams extends Record<string, any>,
  TSearchParams extends Record<string, any>,
> = {
  params: {
    [K in keyof TParams]: Promise<TParams[K]>
  }
  searchParams: {
    [K in keyof TSearchParams]: Promise<TSearchParams[K]>
  }
}
