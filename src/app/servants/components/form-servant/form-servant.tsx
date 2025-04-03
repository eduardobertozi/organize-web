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
import { Servant } from '@/types/servants.types'

export type FormServantProps = {
  currentServant?: Servant
}

export const FormServant = ({ currentServant }: FormServantProps) => {
  const vm = useFormServant({ currentServant })

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
                    value={vm.selectedProductsOptions}
                    options={vm.productsOptions}
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
        <Button className="bg-primary w-full">Salvar</Button>
      </form>
    </Form>
  )
}
