'use client'

import { Sale } from '@/@types/sales.types'
import { Button } from '@/components/ui/button'
import { MultipleSelector } from '@/components/ui/expansions/multiple-selector'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useFormSale } from './use-form-sales'
import { SelectCustomer } from '../select-customer/select-customer'
import { formatLocalCurrency } from '@/utils/format-local-currency'

export type FormSaleProps = {
  currentSale?: Sale
}

export const FormSale = ({ currentSale }: FormSaleProps) => {
  const vm = useFormSale({ currentSale })

  return (
    <Form {...vm.form}>
      <form
        onSubmit={vm.form.handleSubmit(vm.onSubmit)}
        className="space-y-8 p-4"
      >
        <SelectCustomer
          selectCustomer={vm.selectCustomer}
          error={vm.form.formState.errors.customerId?.message}
        />
        <FormField
          name="description"
          control={vm.form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição Venda</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={vm.form.control}
          name="servants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serviços Vinculados</FormLabel>
              <FormControl>
                <MultipleSelector
                  {...field}
                  value={vm.selectedServantsOptions}
                  options={vm.servantsOptions}
                  onChange={vm.onSelectServants}
                  placeholder="Selecione um ou mais serviços."
                  emptyIndicator="Nenhum produto encontrado."
                  className="flex-1"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="amount"
          control={vm.form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  readOnly
                  value={formatLocalCurrency(field.value)}
                />
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
