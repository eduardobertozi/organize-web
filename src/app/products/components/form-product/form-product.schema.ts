import { z } from 'zod'

export const FormProductSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  name: z.string({
    required_error: 'Preencha um nome para o serviço.',
  }),
  price: z.coerce.number({
    required_error: 'Preço é um campo obrigatório.',
  }),
  reference: z.string().default(''),
  attachments: z
    .instanceof(FileList)
    .refine((file) => file?.length >= 1, 'File is required')
    .optional(),
  // .transform((files) => files.length > 0 && files.item(0))
  // .refine((file) => !file || (!!file && file.size <= 1 * 1024 * 1024), {
  //   message: 'O tamanho máximo do arquivo é 1MB.',
  // })
  // .refine((file) => !file || (!!file && file.type?.startsWith('image')), {
  //   message: 'Apenas arquivos de imagem são aceitos.',
  // }),
  supplierId: z.string().optional(),
  stock: z.coerce.number().default(1),
})

export type FormProductInput = z.infer<typeof FormProductSchema>
