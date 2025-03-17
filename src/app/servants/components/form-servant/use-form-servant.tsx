import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { zodResolver } from '@hookform/resolvers/zod'
import { Option } from '@/components/ui/expansions/multiple-selector'
import { FormServant } from './form-servant.types'
import { ServantProps } from '@/root/core/domain/servant/enterprise/servant'
import { FormServantSchema } from './form-servant.schema'

type UseFormServantProps = {
  createServant: (servant: ServantProps) => Promise<void>
}

export const useFormServant = (props: UseFormServantProps) => {
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
    const result = await new Promise<any>((resolve) => {
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
    const products = data.productIds.map((product) => product.value)

    await props.createServant({
      ...data,
      productIds: products,
      productsPrice: totalProductsPrice,
      createdAt: new Date(),
    })

    toast.success('Serviço criado com sucesso.')
    router.refresh()
  }

  return {
    products,
    form,
    onSubmit,
  }
}
