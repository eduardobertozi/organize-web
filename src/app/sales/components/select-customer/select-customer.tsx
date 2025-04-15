'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { InputMask } from '@/components/ui/expansions/input-mask'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SearchIcon } from 'lucide-react'
import { useSelectCustomer } from './use-select-customer'
import { Customer } from '@/@types/customers.types'

export type SelectCustomerProps = {
  selectCustomer: (customer: Customer) => void
  error?: string
}

export const SelectCustomer = ({
  selectCustomer,
  error,
}: SelectCustomerProps) => {
  const vm = useSelectCustomer({ selectCustomer, error })

  return (
    <Dialog onOpenChange={vm.resetIsNewCustomer}>
      <DialogTrigger asChild>
        <div className="space-y-2">
          <Label className={error ? 'text-destructive-foreground' : ''}>
            Cliente
          </Label>
          <Input
            readOnly
            defaultValue={vm.customerName ?? 'Selecionar Cliente'}
          />
          <div className="text-destructive-foreground text-sm">{error}</div>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="border-b p-4 text-start">
          <DialogTitle>Selecionar Cliente</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 p-4">
          <div className="relative space-y-2">
            <Label>Cliente</Label>
            <Input
              placeholder="Buscar nome cliente"
              className="pr-8 md:flex-1"
              value={vm.customerName}
              onChange={vm.onChangeCustomerName}
            />
            <SearchIcon size={16} className="absolute top-8 right-3 z-10" />
          </div>

          <div className="max-h-[200px] w-full overflow-auto">
            {vm.customers.length > 0 &&
              vm.customers.map((customer) => (
                <button
                  key={customer.id}
                  className="flex w-full items-center border-b p-2"
                  onClick={() => vm.onSelectCustomer(customer)}
                >
                  <p className="text-sm">{customer.name}</p>
                </button>
              ))}
          </div>

          {vm.isNewCustomer && (
            <div className="space-y-2">
              <Label>Whatsapp</Label>
              <InputMask
                mask="(00) 00000-0000"
                placeholder="ex.: (47) 99999-9999"
                unmask
                onValueChange={(value) => vm.onChangeCustomerPhone(value)}
              />
              <Button
                type="button"
                className="mt-4 w-full"
                onClick={vm.onSubmit}
              >
                Cadastrar cliente
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
