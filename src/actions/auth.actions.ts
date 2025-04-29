'use server'

import { AuthRequest, AuthResponse } from '@/@types/auth.types'
import { env } from '@/env'
import { FetchService } from '@/services/fetch.service'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const http = new FetchService()
const baseUrl = env.API_BASE_URL

export const login = async (data: AuthRequest) => {
  const response = await http.post<AuthResponse, AuthRequest>({
    url: `${baseUrl}/sessions`,
    data,
  })

  if (!response.access_token) {
    console.log(response)
    throw new Error('Invalid credentials')
  }

  const cookiesStore = await cookies()

  cookiesStore.set('access_token', response.access_token, {
    expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  })
}

export const getUser = async () => {
  const cookiesStore = await cookies()
  const access_token = cookiesStore.get('access_token')

  if (!access_token) {
    return null
  }

  return {
    access_token: access_token.value,
  }
}

export const logout = async () => {
  const cookiesStore = await cookies()
  cookiesStore.delete('access_token')

  return redirect('/auth')
}
