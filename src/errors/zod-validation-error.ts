import { ZodError } from 'zod'

export class ZodValidationError extends ZodError {
  constructor(errors: ZodError) {
    super(errors.issues)
  }
}
