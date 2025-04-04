export type PageProps<
  TParams extends Record<string, unknown>,
  TSearchParams extends Record<string, unknown>,
> = {
  params: {
    [K in keyof TParams]: Promise<TParams[K]>
  }
  searchParams: {
    [K in keyof TSearchParams]: Promise<TSearchParams[K]>
  }
}
