import { env } from '@/env'
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
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${env.API_TOKEN}`,
      },
      next,
      cache,
    }).then((res) => res.json())

    return response as T
  }

  async post<T, D>({ url, data }: PostProps<D>): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.API_TOKEN}`,
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()

    if (response.status !== 201) {
      throw new Error(responseData.message)
    }

    return responseData as T
  }

  async upload<T>({ url, data }: PostProps<File>): Promise<T> {
    const formData = new FormData()
    formData.append('file', data)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.API_TOKEN}`,
      },
      body: formData,
    })

    const responseData = await response.json()

    if (response.status !== 201) {
      throw new Error(responseData.message)
    }

    return responseData as T
  }

  async put<T, D>({ url, data, next }: PutProps<D>): Promise<T> {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.API_TOKEN}`,
      },
      next,
    }).then((res) => res.json())

    return response as T
  }

  async delete<T>({ url }: DeleteProps): Promise<T> {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${env.API_TOKEN}`,
      },
    })

    return response as T
  }

  async patch<T, D>({ url, data, next }: PatchProps<D>): Promise<T> {
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.API_TOKEN}`,
      },
      next,
    }).then((res) => res.json())

    return response as T
  }
}
