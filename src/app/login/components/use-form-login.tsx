'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormLoginInput, formLoginSchema } from './form-login.schema'

export const useFormLogin = () => {
  const form = useForm<FormLoginInput>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data: FormLoginInput) => {
    console.log('data', data)
  }

  return {
    form,
    onSubmit,
  }
}
