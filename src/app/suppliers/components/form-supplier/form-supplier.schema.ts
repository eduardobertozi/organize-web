import { z } from 'zod'

export const FormSupplierSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  name: z.string({
    required_error: 'Nome é obrigatório.',
  }),
  email: z
    .string({
      invalid_type_error: 'Email inválido.',
    })
    .email({
      message: 'Email inválido.',
    })
    .optional(),
  phone: z
    .string({
      required_error: 'Whatsapp é obrigatório.',
      invalid_type_error: 'Whatsapp inválido.',
    })
    .refine((value) => {
      const regex = /^(?:\(?\d{2}\)?\s?)?(?:9\d{4}-?\d{4}|\d{4}-?\d{4})$/
      return regex.test(value)
    }, 'Whatsapp inválido.'),
  city: z.string({
    required_error: 'Cidade é obrigatória.',
  }),
  state: z.string({
    required_error: 'Estado é obrigatório.',
  }),
  address: z.string({
    required_error: 'Endereço é obrigatório.',
  }),
})

export type FormSupplierInput = z.infer<typeof FormSupplierSchema>
