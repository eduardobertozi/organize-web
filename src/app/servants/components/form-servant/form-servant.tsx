'use client'
import { Button } from '@/components/ui/button'
import MultipleSelector from '@/components/ui/expansions/multiple-selector'
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
import { ServantProps } from '@/root/core/domain/servant/enterprise/servant'
import { useFormServant } from './use-form-servant'

type FormServantProps = {
  createServant: (servant: ServantProps) => Promise<void>
}

export const FormServant = (props: FormServantProps) => {
  const { form, products, onSubmit } = useFormServant(props)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative space-y-8 p-4"
      >
        <div className="from-background absolute right-0 bottom-10 left-0 z-10 h-10 bg-gradient-to-t to-transparent" />
        <ScrollArea className="h-[300px] w-full space-y-4 overflow-y-scroll p-2">
          <FormField
            name="name"
            control={form.control}
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
            control={form.control}
            name="productIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produtos vinculados</FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    options={products}
                    placeholder="Selecione um ou mais produtos."
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="profitPercent"
            control={form.control}
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
            control={form.control}
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
