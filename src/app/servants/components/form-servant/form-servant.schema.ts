import { OptionSchema } from '@/utils/option.schema'
import { z } from 'zod'

export const FormServantSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  name: z.string({
    required_error: 'Preencha um nome para o serviço.',
  }),
  productIds: z
    .array(OptionSchema, {
      required_error: 'Selecione um ou mais produtos.',
    })
    .min(1, {
      message: 'Selecione um ou mais produtos.',
    }),
  profitPercent: z.coerce
    .number({
      required_error: 'Preencha a margem de lucro.',
    })
    .min(1, {
      message: 'A margem de lucro deve ser igual ou maior a 1%.',
    }),
  workForcePrice: z.coerce
    .number({
      required_error: 'Preencha o custo da mão de obra.',
    })
    .min(1, {
      message: 'O custo da mão de obra deve ser maior que 0.',
    }),
})
