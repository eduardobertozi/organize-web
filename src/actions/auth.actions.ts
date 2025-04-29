'use server'

import {
  AuthRequest,
  AuthResponse,
  CreateUserResponse,
  UserRequest,
} from '@/@types/auth.types'
import { env } from '@/env'
import { FetchService } from '@/services/fetch.service'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUser } from './user.actions'

const http = new FetchService()
const baseUrl = env.API_BASE_URL

export const login = async (data: AuthRequest) => {
  const response = await http.post<AuthResponse, AuthRequest>({
    url: `${baseUrl}/sessions`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })

  if (!response.access_token) {
    throw new Error('Invalid credentials')
  }

  const cookiesStore = await cookies()

  cookiesStore.set('access_token', response.access_token, {
    expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  })
}

export const logout = async () => {
  const cookiesStore = await cookies()
  cookiesStore.delete('access_token')

  return redirect('/auth')
}

export const createUser = async ({ name, username, password }: UserRequest) => {
  const user = await getUser()

  const data = await http.post<CreateUserResponse, UserRequest>({
    url: `${baseUrl}/accounts`,
    data: {
      name,
      username,
      password,
    },
    headers: {
      Authorization: `Bearer ${user?.access_token}`,
    },
  })

  return data.user
}
