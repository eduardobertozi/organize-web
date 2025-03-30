import {
  DeleteProps,
  GetProps,
  HttpRepository,
  PatchProps,
  PostProps,
  PutProps,
} from './repositories/http.repository'

export class FetchService implements HttpRepository {
  async get<T>({ url, headers, next, cache }: GetProps): Promise<T> {
    const response = await fetch(url, { next, headers, cache }).then((res) =>
      res.json(),
    )
    return response as T
  }

  async post<T, D>({ url, data, headers, next }: PostProps<D>): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers,
      next,
    }).then((res) => res.json())

    return response as T
  }

  async put<T, D>({ url, data, headers, next }: PutProps<D>): Promise<T> {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers,
      next,
    })

    return response as T
  }

  async delete<T>({ url, headers }: DeleteProps): Promise<T> {
    const response = await fetch(url, {
      method: 'DELETE',
      headers,
    }).then((res) => res.json())

    return response as T
  }

  async patch<T, D>({ url, data, headers, next }: PatchProps<D>): Promise<T> {
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers,
      next,
    }).then((res) => res.json())

    return response as T
  }
}
