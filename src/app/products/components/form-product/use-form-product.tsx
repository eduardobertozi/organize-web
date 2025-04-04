import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FormProductProps } from './form-product'
import { FormProductInput, FormProductSchema } from './form-product.schema'
import { useProductsContext } from '../../context/products.context'
import { uploadAndCreateAttachments } from '@/actions/attachments.actions'
import { fetchAllSuppliers } from '@/actions/suppliers.actions'
import { useEffect, useState } from 'react'
import { Option } from '@/components/ui/expansions/multiple-selector'

export type UseFormProductProps = FormProductProps

export const useFormProduct = ({ currentProduct }: UseFormProductProps) => {
  const router = useRouter()
  const { reloadProducts, createNewProduct, updateOneProduct } =
    useProductsContext()
  const [suppliersOptions, setSuppliersOptions] = useState<Option[]>([])

  const form = useForm<FormProductInput>({
    resolver: zodResolver(FormProductSchema),
    defaultValues: {
      id: currentProduct?.id ?? null,
      name: currentProduct?.name ?? '',
      reference: currentProduct?.reference ?? '',
      price: currentProduct?.price ?? 0,
      stock: currentProduct?.stock ?? 1,
      supplierId: currentProduct?.supplierId ?? '',
    },
  })

  const fetchSuppliers = async () => {
    const response = await fetchAllSuppliers()

    const suppliersToOptions = response.suppliers.map((supplier) => ({
      label: supplier.name,
      value: supplier.id,
    }))

    setSuppliersOptions(suppliersToOptions)

    if (currentProduct) {
      form.setValue('supplierId', currentProduct.supplierId!)
    }
  }

  const onSubmit = async (product: FormProductInput) => {
    const attachmentsIds = await uploadAndCreateAttachments(
      product.attachments!,
    )

    const payload = {
      ...product,
      id: product.id!,
      attachments: attachmentsIds,
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
    void fetchSuppliers()
  }, [])

  return {
    form,
    suppliersOptions,
    fetchSuppliers,
    onSubmit,
  }
}
