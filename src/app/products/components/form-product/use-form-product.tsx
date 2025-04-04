import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FormProductProps } from './form-product'
import { FormProductInput, FormProductSchema } from './form-product.schema'
import { useProductsContext } from '../../context/products.context'
import { uploadProductAttachment } from '@/actions/attachments.actions'

export type UseFormProductProps = FormProductProps

export const useFormProduct = ({ currentProduct }: UseFormProductProps) => {
  const router = useRouter()
  const { reloadProducts, createNewProduct, updateOneProduct } =
    useProductsContext()

  const form = useForm<FormProductInput>({
    resolver: zodResolver(FormProductSchema),
    defaultValues: {
      id: currentProduct?.id ?? null,
      name: currentProduct?.name ?? '',
      reference: currentProduct?.reference ?? '',
      price: currentProduct?.price ?? 0,
      stock: currentProduct?.stock ?? 1,
    },
  })

  const uploadFiles = async (files: FileList): Promise<string[]> => {
    const attachmentIds: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const { attachmentId } = await uploadProductAttachment(file)
      attachmentIds.push(attachmentId)
    }

    return attachmentIds
  }

  const onSubmit = async (product: FormProductInput) => {
    const attachmentsIds = await uploadFiles(product.attachments!)

    console.log(attachmentsIds)

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

  // useEffect(() => {
  //   void fetchProducts()
  // }, [])

  return {
    form,
    onSubmit,
  }
}
