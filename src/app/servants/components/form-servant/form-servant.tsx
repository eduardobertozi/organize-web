'use client'
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

import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useFormServant } from './use-form-servant'
import { Servant, ServantRequest } from '@/app/servants/servant.model'

export type FormServantProps = {
  defaultServant?: Servant
  createServant?: (servant: ServantRequest) => Promise<void>
  editServant?: (servant: Servant) => Promise<void>
}

export const FormServant = (props: FormServantProps) => {
  const vm = useFormServant(props)

  return (
    <Form {...vm.form}>
      <form
        onSubmit={vm.form.handleSubmit(vm.onSubmit)}
        className="space-y-8 p-4"
      >
        <ScrollArea className="h-[300px] w-full space-y-4 p-2">
          <FormField
            name="name"
            control={vm.form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Serviço</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={vm.form.control}
            name="products"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produtos vinculados</FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    value={vm.selectedProducts}
                    options={vm.products}
                    placeholder="Selecione um ou mais produtos."
                    emptyIndicator="Nenhum produto encontrado."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="profitPercent"
            control={vm.form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Margem de Lucro (%)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="workForcePrice"
            control={vm.form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custo mão de obra (R$)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </ScrollArea>
        <Button className="w-full">Salvar</Button>
      </form>
    </Form>
  )
}
