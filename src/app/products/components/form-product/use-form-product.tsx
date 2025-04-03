import { Option } from '@/components/ui/expansions/multiple-selector'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormProductProps } from './form-product'
import { FormProductInput, FormProductSchema } from './form-product.schema'
import { useProductsContext } from '../../context/products.context'
import { fetchAllProducts } from '@/actions/products.actions'
import { useRouter } from 'next/navigation'

export type UseFormProductProps = FormProductProps

export const useFormProduct = ({ currentProduct }: UseFormProductProps) => {
  const router = useRouter()
  const { reloadProducts, createNewProduct, updateOneProduct } =
    useProductsContext()
  const [productsOptions, setProductsOptions] = useState<Option[]>([])
  const [selectedProductsOptions, setSelectedProductsOptions] = useState<
    Option[]
  >([])
  const [totalProductsPrice, setTotalProductsPrice] = useState(0)

  const form = useForm<FormProductInput>({
    resolver: zodResolver(FormProductSchema),
    defaultValues: {
      id: currentProduct?.id ?? null,
      name: currentProduct?.name ?? '',
      products: [],
      profitPercent: currentProduct?.profitPercent ?? 0,
      workForcePrice: currentProduct?.workForcePrice ?? 0,
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

    if (currentProduct) {
      const selectedProducts = productsToOptions.filter((product) =>
        currentProduct?.products.includes(product.value),
      )

      form.setValue('products', selectedProducts)
      setSelectedProductsOptions(selectedProducts)
    }
  }

  const calculateTotalPrice = ({
    workForcePrice,
    profitPercent,
  }: FormProductInput) => {
    const productPrice = totalProductsPrice + workForcePrice
    const profit = (productPrice * profitPercent) / 100

    return productPrice + profit
  }

  const onSubmit = async (product: FormProductInput) => {
    const price = calculateTotalPrice(product)

    const payload = {
      ...product,
      id: product.id!,
      price,
      productsPrice: totalProductsPrice,
      products: product.products.map((product) => product.value),
    }

    if (currentProduct) {
      await updateOneProduct(payload)
    } else {
      await createNewProduct(payload)
    }

    await reloadProducts()
    form.reset()
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
