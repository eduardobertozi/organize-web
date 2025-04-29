'use client'

import { Customer } from '@/@types/customers.types'
import { useCallback, useState, useTransition } from 'react'
import { SelectCustomerProps } from './select-customer'
import { debounce } from 'lodash'
import { createCustomer, fetchAllCustomers } from '@/actions/customers.actions'
import { toast } from 'sonner'
import { createUser } from '@/actions/auth.actions'

export const useSelectCustomer = ({ selectCustomer }: SelectCustomerProps) => {
  const [customerName, setCustomerName] = useState('')
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isNewCustomer, setIsNewCustomer] = useState(false)
  const [customerPhone, setCustomerPhone] = useState('')
  const [loading, startTransition] = useTransition()

  const onChangeCustomerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(event.target.value)
    onChangeCustomerSearchName(event.target.value)
  }

  const onChangeCustomerPhone = (customerPhone: string) => {
    setCustomerPhone(customerPhone)
  }

  const onChangeCustomerSearchName = useCallback(
    debounce(async (value: string) => {
      startTransition(async () => {
        setCustomerName(value)

        if (value.length < 3) {
          setCustomers([])
          setIsNewCustomer(false)
          return
        }

        const { customers } = await fetchAllCustomers(value)
        console.log(customers, 'CUSTOMERS')

        setCustomers(customers)
        setIsNewCustomer(customers.length === 0)
      })
    }, 300),
    [],
  )

  const onSelectCustomer = (customer: Customer) => {
    setCustomerName(customer.name)
    setCustomers([])
    setIsNewCustomer(false)
    selectCustomer(customer)
  }

  const resetIsNewCustomer = () => {
    setIsNewCustomer(false)
  }

  const createNewCustomer = () => {
    startTransition(async () => {
      try {
        const user = await createUser({
          name: customerName,
          username: customerName,
          password: customerPhone,
        })

        const { customer } = await createCustomer({
          name: customerName,
          phone: customerPhone,
          userId: user.id,
        })

        setCustomerName(customerName)
        setCustomers([])
        setIsNewCustomer(false)
        selectCustomer(customer)

        toast.success('Cliente cadastrado com sucesso!')
      } catch (err) {
        const { message } = err as Error
        toast.error(message)
      }
    })
  }

  return {
    customers,
    customerName,
    isNewCustomer,
    loading,
    createNewCustomer,
    onChangeCustomerPhone,
    onSelectCustomer,
    onChangeCustomerName,
    resetIsNewCustomer,
  }
}
