type DeafultProps = {
  headers?: HeadersInit
  next?: NextFetchRequestConfig
  cache?: RequestCache
}

export type GetProps = DeafultProps & {
  url: string
}

export type PostProps<D> = DeafultProps & {
  url: string
  data: D
}

export type PutProps<D> = DeafultProps & {
  url: string
  data: D
}

export type DeleteProps = DeafultProps & {
  url: string
}

export type PatchProps<D> = DeafultProps & {
  url: string
  data: D
}

export interface HttpRepository {
  get<T>(data: GetProps): Promise<T>
  post<T, D>(data: PostProps<D>): Promise<T>
  put<T, D>(data: PutProps<D>): Promise<T>
  delete<T>(data: DeleteProps): Promise<T>
  patch<T, D>(data: PatchProps<D>): Promise<T>
}
