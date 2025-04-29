'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormLoginInput, formLoginSchema } from './form-login.schema'
import { toast } from 'sonner'
import { login } from '@/actions/auth.actions'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

export const useFormLogin = () => {
  const router = useRouter()
  const [loading, startTransition] = useTransition()

  const form = useForm<FormLoginInput>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data: FormLoginInput) => {
    try {
      startTransition(async () => {
        await login(data)
        router.push('/')
      })
    } catch {
      toast.error('Falha ao fazer login, verifique suas credenciais')
    }
  }

  return {
    form,
    loading,
    onSubmit,
  }
}
