'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LockIcon, UserIcon } from 'lucide-react'
import { useFormLogin } from './use-form-login'

export const FormLogin = () => {
  const vm = useFormLogin()

  return (
    <Form {...vm.form}>
      <form onSubmit={vm.form.handleSubmit(vm.onSubmit)} className="space-y-4">
        <FormField
          name="username"
          control={vm.form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  icon={UserIcon}
                  placeholder="Digite seu e-mail"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={vm.form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input {...field} type="password" icon={LockIcon} isPassword />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-4 w-full" disabled={vm.loading}>
          Entrar
        </Button>
      </form>
    </Form>
  )
}
