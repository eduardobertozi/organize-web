import { z } from 'zod'

export const formLoginSchema = z.object({
  username: z.string().min(1, {
    message: 'Campo obrigatório',
  }),
  password: z
    .string()
    .min(1, {
      message: 'Campo obrigatório',
    })
    .refine((value) => !/^[A-Z]+$/.test(value), {
      message: 'O caps lock está ligado',
    }),
})

export type FormLoginInput = z.infer<typeof formLoginSchema>
