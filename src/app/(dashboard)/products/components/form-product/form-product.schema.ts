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
  attachments:
    typeof window === 'undefined' ? z.any() : z.instanceof(FileList).optional(),
  supplierId: z.string().optional(),
  stock: z.coerce.number().default(1),
})

export type FormProductInput = z.infer<typeof FormProductSchema>
