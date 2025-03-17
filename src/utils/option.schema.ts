import { z } from 'zod'

export const OptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disabled: z.boolean().optional(),
})
