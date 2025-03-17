import { z } from 'zod'
import { FormServantSchema } from './form-servant.schema'

export type FormServant = z.infer<typeof FormServantSchema>
