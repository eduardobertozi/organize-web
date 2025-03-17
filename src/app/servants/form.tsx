'use client'
import { Button } from '@/components/ui/button'
import MultipleSelector, {
  Option,
} from '@/components/ui/expansions/multiple-selector'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ServantProps } from '@/root/core/domain/servant/enterprise/servant'
import { zodResolver } from '@hookform/resolvers/zod'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const OptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disabled: z.boolean().optional(),
})

const FormServantSchema = z.object({
  name: z.string({
    required_error: 'Preencha um nome para o serviço.',
  }),
  productIds: z.array(OptionSchema, {
    required_error: 'Selecione um ou mais produtos.',
  }),
  profitPercent: z
    .string({
      required_error: 'Preencha a margem de lucro.',
    })
    .transform((value) => parseInt(value)),
  workForcePrice: z
    .string({
      required_error: 'Preencha o custo da mão de obra.',
    })
    .transform((value) => parseInt(value)),
})

export type FormServant = z.infer<typeof FormServantSchema>

type FormServantProps = {
  createServant: (servant: ServantProps) => Promise<void>
}

export const FormServant = (props: FormServantProps) => {
  const router = useRouter()
  const [products, setProducts] = useState<Option[]>([])
  const [totalProductsPrice, setTotalProductsPrice] = useState(0)

  const form = useForm<FormServant>({
    resolver: zodResolver(FormServantSchema),
    defaultValues: {
      name: '',
      productIds: [],
      profitPercent: 0,
      workForcePrice: 0,
    },
  })

  const fetchAllProducts = async () => {
    const result = await new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'erer46e-we6r4ew6r8w-wer68wer46w',
            name: 'Produto Teste 1',
            value: 11.92,
          },
          {
            id: 'g4sdfg8-fdgf46dfg-asdffh64354354',
            name: 'Produto Teste 2',
            value: 15.92,
          },
          {
            id: 'asd-esedfsdfsdf-t43546-fge5y6y5f',
            name: 'Produto Teste 3',
            value: 18.92,
          },
        ])
      }, 1000)
    })

    const productsToOptions = result.map((product: any) => ({
      label: product.name,
      value: product.id,
    }))

    setTotalProductsPrice(
      result.reduce((acc: number, product: any) => acc + product.value, 0),
    )
    setProducts(productsToOptions)
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])

  const onSubmit = async (data: FormServant) => {
    await props.createServant({
      ...data,
      productIds: data.productIds.map((product) => product.value),
      productsPrice: totalProductsPrice,
      createdAt: new Date(),
    })

    toast.success('Serviço criado com sucesso.')
    router.refresh()
  }

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
