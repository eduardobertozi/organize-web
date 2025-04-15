import { OptionSchema } from '@/utils/option.schema'
import { z } from 'zod'

export const FormSaleSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  description: z.string().optional(),
  amount: z.coerce.number(),
  customerId: z
    .string()
    // .uuid({
    //   message: 'Selecione um cliente.',
    // })
    .optional(),
  servants: z
    .array(OptionSchema, {
      required_error: 'Selecione um ou mais serviços.',
    })
    .min(1, {
      message: 'Selecione um ou mais serviços.',
    }),
})

export type FormSaleInput = z.infer<typeof FormSaleSchema>
