import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { zodResolver } from '@hookform/resolvers/zod'
import { Option } from '@/components/ui/expansions/multiple-selector'
import { FormServant } from './form-servant.types'
import { FormServantSchema } from './form-servant.schema'
import { FormServantProps } from './form-servant'

export type UseFormServantProps = FormServantProps

export const useFormServant = (props: UseFormServantProps) => {
  const [products, setProducts] = useState<Option[]>([])
  const [selectedProducts, setSelectedProducts] = useState<Option[]>([])
  const [totalProductsPrice, setTotalProductsPrice] = useState(0)

  const form = useForm<FormServant>({
    resolver: zodResolver(FormServantSchema),
    defaultValues: {
      id: props.defaultServant?.id ?? null,
      name: props.defaultServant?.name ?? '',
      products: [],
      profitPercent: props.defaultServant?.profitPercent ?? 0,
      workForcePrice: props.defaultServant?.workForcePrice ?? 0,
    },
  })

  const fetchAllProducts = async () => {
    const result = await new Promise<
      { id: string; name: string; price: number }[]
    >((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'product-1',
            name: 'Produto Teste 1',
            price: 11.92,
          },
          {
            id: 'product-2',
            name: 'Produto Teste 2',
            price: 15.92,
          },
          {
            id: 'product-3',
            name: 'Produto Teste 3',
            price: 18.92,
          },
        ])
      }, 1000)
    })

    const productsToOptions = result.map((product) => ({
      label: product.name,
      value: product.id,
    }))

    setTotalProductsPrice(
      result.reduce(
        (acc: number, product: { id: string; name: string; price: number }) =>
          acc + product.price,
        0,
      ),
    )
    setProducts(productsToOptions)
  }

  useEffect(() => {
    void fetchAllProducts()
  }, [])

  const onSubmit = async (data: FormServant) => {
    const productsIds = data.products.map((product) => product.value)
    const { id, products, ...rest } = data

    if (props.createServant) {
      await props.createServant({
        name: data.name,
        profitPercent: data.profitPercent,
        workForcePrice: data.workForcePrice,
        productsPrice: totalProductsPrice,
      })
      toast.success('Serviço criado com sucesso.')
    }

    if (props.editServant) {
      await props.editServant(rest)
      toast.success('Serviço editado com sucesso.')
    }
  }

  return {
    products,
    selectedProducts,
    form,
    onSubmit,
  }
}
