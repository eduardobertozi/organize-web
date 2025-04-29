'use client'
import { Supplier } from '@/@types/suppliers.types'
import { Button } from '@/components/ui/button'
import { InputMask } from '@/components/ui/expansions/input-mask'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormSupplier } from './use-form-supplier'

export type FormSupplierProps = {
  currentSupplier?: Supplier
}

export const FormSupplier = ({ currentSupplier }: FormSupplierProps) => {
  const vm = useFormSupplier({ currentSupplier })

  return (
    <Form {...vm.form}>
      <form
        onSubmit={vm.form.handleSubmit(vm.onSubmit)}
        className="space-y-8 p-4"
      >
        <FormField
          name="name"
          control={vm.form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={vm.form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="phone"
          control={vm.form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Whatsapp</FormLabel>
              <FormControl>
                <InputMask
                  mask="(00) 00000-0000"
                  placeholder="ex.: (49) 99123-4567"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="city"
          control={vm.form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="state"
          control={vm.form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="address"
          control={vm.form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="bg-primary w-full">Salvar</Button>
      </form>
    </Form>
  )
}
