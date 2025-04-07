'use client'

import { Supplier } from '@/@types/suppliers.types'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { CalendarIcon, TrashIcon } from 'lucide-react'
import { useSuppliersContext } from '../../context/suppliers.context'
import { FormSupplier } from '../form-supplier/form-supplier'
import dayjs from 'dayjs'
type ListItemProps = {
  supplier: Supplier
}

export const ListItem: React.FC<ListItemProps> = ({ supplier }) => {
  const { deleteOneSupplier } = useSuppliersContext()

  return (
    <div
      data-testid="list-item"
      className="flex w-full gap-4 border-b p-2 py-4 text-sm hover:bg-zinc-900"
    >
      <Sheet>
        <SheetTrigger className="w-full">
          <ListItemLine supplier={supplier} />
        </SheetTrigger>
        <SheetContent side="left" className="w-full p-4">
          <SheetHeader>
            <SheetTitle>Fornecedor</SheetTitle>
            <SheetDescription>
              Adicione, edite ou exclua um fornecedor.
            </SheetDescription>
          </SheetHeader>

          <FormSupplier currentSupplier={supplier} />
        </SheetContent>
      </Sheet>

      <Button
        type="button"
        variant="outline"
        className="text-destructive/60"
        onClick={() => deleteOneSupplier(supplier.id)}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  )
}

const ListItemLine = ({ supplier }: { supplier: Supplier }) => {
  return (
    <div className="flex w-full flex-1 flex-col items-start p-0 hover:bg-transparent md:flex-row md:items-center md:justify-between">
      <div className="flex w-full gap-4 text-start text-sm">
        <p className="flex-1 md:flex-none">{supplier.name}</p>
      </div>

      <div className="flex gap-1 text-xs whitespace-nowrap text-zinc-600">
        <CalendarIcon size={16} />
        <p>{dayjs(supplier.createdAt).format('DD/MM/YYYY HH:mm')}</p>
      </div>
    </div>
  )
}
