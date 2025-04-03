import { Option } from '@/components/ui/expansions/multiple-selector'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormServantProps } from './form-servant'
import { FormServantInput, FormServantSchema } from './form-servant.schema'
import { useServantsContext } from '../../context/servants.context'
import { fetchAllProducts } from '@/actions/products.actions'
import { useRouter } from 'next/navigation'

export type UseFormServantProps = FormServantProps

export const useFormServant = ({ currentServant }: UseFormServantProps) => {
  const router = useRouter()
  const { reloadServants, createNewServant, updateOneServant } =
    useServantsContext()
  const [productsOptions, setProductsOptions] = useState<Option[]>([])
  const [selectedProductsOptions, setSelectedProductsOptions] = useState<
    Option[]
  >([])
  const [totalProductsPrice, setTotalProductsPrice] = useState(0)

  const form = useForm<FormServantInput>({
    resolver: zodResolver(FormServantSchema),
    defaultValues: {
      id: currentServant?.id ?? null,
      name: currentServant?.name ?? '',
      products: [],
      profitPercent: currentServant?.profitPercent ?? 0,
      workForcePrice: currentServant?.workForcePrice ?? 0,
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

    setProductsOptions(productsToOptions)

    if (currentServant) {
      const selectedProducts = productsToOptions.filter((product) =>
        currentServant?.products.includes(product.value),
      )

      form.setValue('products', selectedProducts)
      setSelectedProductsOptions(selectedProducts)
    }
  }

  const calculateTotalPrice = ({
    workForcePrice,
    profitPercent,
  }: FormServantInput) => {
    const servantPrice = totalProductsPrice + workForcePrice
    const profit = (servantPrice * profitPercent) / 100

    return servantPrice + profit
  }

  const onSubmit = async (servant: FormServantInput) => {
    const price = calculateTotalPrice(servant)

    const payload = {
      ...servant,
      id: servant.id!,
      price,
      productsPrice: totalProductsPrice,
      products: servant.products.map((product) => product.value),
    }

    if (currentServant) {
      await updateOneServant(payload)
    } else {
      await createNewServant(payload)
    }

    await reloadServants()
    router.refresh()
  }

  useEffect(() => {
    void fetchProducts()
  }, [])

  return {
    productsOptions,
    selectedProductsOptions,
    form,
    onSubmit,
  }
}
