import { fetchAllProducts } from '@/app/products/products.actions'
import { Option } from '@/components/ui/expansions/multiple-selector'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormServantProps } from './form-servant'
import { FormServantSchema } from './form-servant.schema'
import { FormServant } from './form-servant.types'

export type UseFormServantProps = FormServantProps

export const useFormServant = (props: UseFormServantProps) => {
  const router = useRouter()
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

  const fetchProducts = async () => {
    const response = await fetchAllProducts()

    const productsToOptions = response.products.map((product) => ({
      label: product.name,
      value: product.id,
    }))

    setTotalProductsPrice(
      response.products.reduce(
        (acc: number, product) => acc + product.price,
        0,
      ),
    )

    setProducts(productsToOptions)

    if (props.defaultServant?.products) {
      setSelectedProducts(
        props.defaultServant.products.map((product) => ({
          label: product.name,
          value: product.id,
        })),
      )
    }
  }

  const onSubmit = async ({ products, id, ...data }: FormServant) => {
    const servantPrice = totalProductsPrice + data.workForcePrice
    const profit = (servantPrice * data.profitPercent) / 100
    const totalPrice = servantPrice + profit

    if (props.createServant) {
      props.createServant({
        ...data,
        price: totalPrice,
        productsPrice: totalProductsPrice,
      })
    }

    if (props.editServant) {
      props.editServant({
        ...data,
        id: props.defaultServant!.id,
        price: totalPrice,
        productsPrice: totalProductsPrice,
      })
    }

    form.reset()
    setSelectedProducts([])

    router.refresh()
  }

  useEffect(() => {
    void fetchProducts()
  }, [])

  return {
    products,
    selectedProducts,
    form,
    onSubmit,
  }
}
