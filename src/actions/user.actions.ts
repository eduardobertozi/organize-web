'use server'

import { cookies } from 'next/headers'

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
