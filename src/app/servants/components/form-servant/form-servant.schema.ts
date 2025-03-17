import { OptionSchema } from '@/utils/option.schema'
import { z } from 'zod'

export const FormServantSchema = z.object({
  name: z.string({
    required_error: 'Preencha um nome para o serviço.',
  }),
  productIds: z.array(OptionSchema, {
    required_error: 'Selecione um ou mais produtos.',
  }),
  profitPercent: z
    .string({
      required_error: 'Preencha a margem de lucro.',
    })
    .transform((value) => parseInt(value)),
  workForcePrice: z
    .string({
      required_error: 'Preencha o custo da mão de obra.',
    })
    .transform((value) => parseInt(value)),
})
