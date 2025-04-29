'use client'

import { Customer } from '@/@types/customers.types'
import { useCallback, useState } from 'react'
import { SelectCustomerProps } from './select-customer'
import { debounce } from 'lodash'

const customersMock = [
  {
    id: '1',
    name: 'Cliente 1',
    phone: '47999999999',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Cliente 2',
    phone: '47999999999',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const useSelectCustomer = ({ selectCustomer }: SelectCustomerProps) => {
  const [customerName, setCustomerName] = useState('')
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isNewCustomer, setIsNewCustomer] = useState(false)
  const [customerPhone, setCustomerPhone] = useState('')

  const onChangeCustomerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(event.target.value)
    onChangeCustomerSearchName(event.target.value)
  }

  const onChangeCustomerPhone = (customerPhone: string) => {
    setCustomerPhone(customerPhone)
  }

  const onChangeCustomerSearchName = useCallback(
    debounce((value: string) => {
      setCustomerName(value)

      if (value.length < 3) {
        setCustomers([])
        setIsNewCustomer(false)
        return
      }

      const data = customersMock.filter((customer) =>
        customer.name.toLowerCase().includes(value.toLowerCase()),
      )

      setCustomers(data)
      setIsNewCustomer(data.length === 0)
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

  const onSubmit = () => {
    console.log({
      customerName,
      customerPhone,
    })
  }

  return {
    customers,
    customerName,
    isNewCustomer,
    onSubmit,
    onChangeCustomerPhone,
    onSelectCustomer,
    onChangeCustomerName,
    resetIsNewCustomer,
  }
}
