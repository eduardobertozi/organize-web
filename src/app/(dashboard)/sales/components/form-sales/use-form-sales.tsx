import { Option } from '@/components/ui/expansions/multiple-selector'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSalesContext } from '../context/sales.context'
import { FormSaleProps } from './form-sales'
import { FormSaleInput, FormSaleSchema } from './form-sales.schema'
import { fetchAllServants } from '@/actions/servants.actions'
import { Servant } from '@/@types/servants.types'
import { Customer } from '@/@types/customers.types'
import { useSheetToggle } from '@/components/ui/sheet'

export type UseFormSaleProps = FormSaleProps

export const useFormSale = ({ currentSale }: UseFormSaleProps) => {
  const { toggle } = useSheetToggle()
  const { reloadSales, createNewSale, updateOneSale } = useSalesContext()
  const [servants, setServants] = useState<Servant[]>([])
  const [servantsOptions, setServantsOptions] = useState<Option[]>([])
  const [selectedServantsOptions, setSelectedServantsOptions] = useState<
    Option[]
  >([])

  const form = useForm<FormSaleInput>({
    resolver: zodResolver(FormSaleSchema),
    defaultValues: {
      id: currentSale?.id ?? null,
      description: currentSale?.description ?? '',
      customerId: currentSale?.customerId ?? '',
      amount: currentSale?.amount ?? 0,
      servants: [],
    },
  })

  const fetchServants = async () => {
    const response = await fetchAllServants()

    setServants(response.servants)

    const servantsToOptions = response.servants.map((servant) => ({
      label: servant.name,
      value: servant.id,
    }))

    setServantsOptions(servantsToOptions)

    if (currentSale) {
      const selectedServants = response.servants
        .filter((servant) => currentSale?.servants.includes(servant.id))
        .map((servant) => ({
          label: servant.name,
          value: servant.id,
        }))

      form.setValue('servants', selectedServants)
      setSelectedServantsOptions(selectedServants)
    }
  }

  const selectCustomer = (customer: Customer) => {
    form.setValue('customerId', customer.id)
    form.setValue('description', `Venda cliente: ${customer.name}`)
  }

  const onSelectServants = (selectedServants: Option[]) => {
    setSelectedServantsOptions(selectedServants)
    form.setValue('servants', selectedServants)

    const servantsAmount = servants
      .filter((servant) =>
        selectedServants.some((selected) => selected.value === servant.id),
      )
      .reduce((acc, curr) => {
        return acc + curr.price
      }, 0)

    form.setValue('amount', servantsAmount)
  }

  const onSubmit = async (sale: FormSaleInput) => {
    const payload = {
      id: sale.id!,
      description: sale.description,
      customerId: sale.customerId!,
      amount: sale.amount,
      servants: sale.servants.map((servant) => servant.value),
    }

    if (currentSale) {
      await updateOneSale(payload)
    } else {
      await createNewSale(payload)
    }

    await reloadSales()
    toggle()
  }

  useEffect(() => {
    void fetchServants()
  }, [])

  return {
    servantsOptions,
    selectedServantsOptions,
    form,
    onSubmit,
    selectCustomer,
    onSelectServants,
  }
}
