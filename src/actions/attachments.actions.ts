'use server'

import { env } from '@/env'
import { FetchService } from '@/services/fetch.service'
import { revalidatePath } from 'next/cache'

const http = new FetchService()
const baseUrl = `${env.API_BASE_URL}/attachments`

export const uploadProductAttachment = async (file: File) => {
  const response = await http.upload<{ attachmentId: string }>({
    url: baseUrl,
    data: file,
    headers: {
      Authorization: `Bearer ${env.API_TOKEN}`,
    },
  })

  revalidatePath('/products')

  return response
}
