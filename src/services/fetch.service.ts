import { getUser } from '@/actions/user.actions'
import {
  DeleteProps,
  GetProps,
  HttpRepository,
  PatchProps,
  PostProps,
  PutProps,
} from './repositories/http.repository'

export class FetchService implements HttpRepository {
  private async user() {
    const user = await getUser()

    if (!user) {
      return {
        access_token: '',
      }
    }

    return user
  }

  async get<T>({ url, next, cache }: GetProps): Promise<T> {
    const { access_token } = await this.user()

    const response = await fetch(url, {
      next,
      cache,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    }).then((res) => res.json())

    return response as T
  }

  async post<T, D>({ url, data }: PostProps<D>): Promise<T> {
    const { access_token } = await this.user()

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
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
    const { access_token } = await this.user()

    const formData = new FormData()
    formData.append('file', data)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${access_token}`,
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
    const { access_token } = await this.user()

    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      next,
    })

    return response as T
  }

  async delete<T>({ url }: DeleteProps): Promise<T> {
    const { access_token } = await this.user()

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    })

    return response as T
  }

  async patch<T, D>({ url, data, next }: PatchProps<D>): Promise<T> {
    const { access_token } = await this.user()

    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      next,
    }).then((res) => res.json())

    return response as T
  }
}
