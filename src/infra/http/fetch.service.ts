import {
  DeleteProps,
  GetProps,
  HttpRepository,
  PatchProps,
  PostProps,
  PutProps,
} from './repositories/http.repository'

export class FetchService implements HttpRepository {
  async get<T>({ url, next, cache }: GetProps): Promise<T> {
    const response = await fetch(url, { next, cache }).then((res) => res.json())
    return response as T
  }

  async post<T, D>({ url, data, next }: PostProps<D>): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      next,
    }).then((res) => res.json())

    return response as T
  }

  async put<T, D>({ url, data, next }: PutProps<D>): Promise<T> {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      next,
    })

    return response as T
  }

  async delete<T, D>({ url, data, next }: DeleteProps<D>): Promise<T> {
    const response = await fetch(url, {
      method: 'DELETE',
      next,
      body: JSON.stringify(data),
    }).then((res) => res.json())

    return response as T
  }

  async patch<T, D>({ url, data, next }: PatchProps<D>): Promise<T> {
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      next,
    }).then((res) => res.json())

    return response as T
  }
}
