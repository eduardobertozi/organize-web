import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormSupplierProps } from './form-supplier'
import { FormSupplierInput, FormSupplierSchema } from './form-supplier.schema'
import { useSuppliersContext } from '../../context/suppliers.context'
import { useRouter } from 'next/navigation'

export type UseFormSupplierProps = FormSupplierProps

export const useFormSupplier = ({ currentSupplier }: UseFormSupplierProps) => {
  const router = useRouter()
  const { reloadSuppliers, createNewSupplier, updateOneSupplier } =
    useSuppliersContext()

  const form = useForm<FormSupplierInput>({
    resolver: zodResolver(FormSupplierSchema),
    defaultValues: currentSupplier,
  })

  const onSubmit = async (supplier: FormSupplierInput) => {
    if (currentSupplier?.id) {
      await updateOneSupplier({
        ...supplier,
        id: currentSupplier.id,
      })
    } else {
      await createNewSupplier({
        ...supplier,
        id: undefined,
      })
    }

    await reloadSuppliers()

    router.refresh()
  }

  return {
    form,
    onSubmit,
  }
}
