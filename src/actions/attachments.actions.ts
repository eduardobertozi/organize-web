'use server'

import { env } from '@/env'
import { FetchService } from '@/services/fetch.service'
import { revalidatePath } from 'next/cache'

const http = new FetchService()
const baseUrl = `${env.API_BASE_URL}/attachments`

export const uploadFile = async (file: File) => {
  const response = await http.upload<{ attachmentId: string }>({
    url: baseUrl,
    data: file,
    headers: {
      Authorization: `Bearer ${env.API_TOKEN}`,
    },
  })

  console.log(response)

  revalidatePath('/products')

  return response
}

/**
 * Uploads a list of files and creates corresponding attachments.
 *
 * This function iterates through the provided `FileList`, uploads each file
 * using the `uploadFile` function, and collects the resulting attachment IDs
 * into an array. The array of attachment IDs is then returned.
 *
 * @param files - A `FileList` object containing the files to be uploaded.
 * @returns A promise that resolves to an array of attachment IDs as strings.
 */
export const uploadAndCreateAttachments = async (
  files: FileList,
): Promise<string[]> => {
  const attachmentIds: string[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const { attachmentId } = await uploadFile(file)
    attachmentIds.push(attachmentId)
  }

  return attachmentIds
}
