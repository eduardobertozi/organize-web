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
import { useFormProduct } from './use-form-product'
import { Product } from '@/types/products.types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type FormProductProps = {
  currentProduct?: Product
}

export const FormProduct = ({ currentProduct }: FormProductProps) => {
  const vm = useFormProduct({ currentProduct })
  const fileRef = vm.form.register('attachments')

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
              <FormLabel>Nome Produto</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="price"
          control={vm.form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço unitário</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="reference"
          control={vm.form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referência</FormLabel>
              <FormControl>
                <Input placeholder="SKU, Código de barras..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="attachments"
          control={vm.form.control}
          render={() => (
            <FormItem>
              <FormLabel>Imagens do produto</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  placeholder="Carragar imagens"
                  {...fileRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="supplierId"
          control={vm.form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fornecedor</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Fornecedor 1</SelectItem>
                    <SelectItem value="2">Fornecedor 2</SelectItem>
                    <SelectItem value="3">Fornecedor 3</SelectItem>
                  </SelectContent>
                </Select>
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
