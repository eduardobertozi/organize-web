'use client'

import { Sale } from '@/@types/sales.types'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import dayjs from 'dayjs'
import { CalendarIcon, TrashIcon, UserIcon } from 'lucide-react'
import { useSalesContext } from '../context/sales.context'
import { FormSale } from '../form-sales/form-sales'

type ListItemProps = {
  sale: Sale
}

export const ListItem: React.FC<ListItemProps> = ({ sale }) => {
  const { deleteOneSale } = useSalesContext()

  return (
    <div
      data-testid="list-item"
      className="flex w-full gap-4 border-b p-2 py-4 text-sm hover:bg-zinc-900"
    >
      <Sheet>
        <SheetTrigger className="w-full">
          <ListItemLine sale={sale} />
        </SheetTrigger>
        <SheetContent side="right" className="w-full p-4">
          <SheetHeader>
            <SheetTitle>Venda</SheetTitle>
            <SheetDescription>
              Adicione, edite ou exclua uma venda.
            </SheetDescription>
          </SheetHeader>

          <FormSale currentSale={sale} />
        </SheetContent>
      </Sheet>

      <Button
        type="button"
        variant="outline"
        className="text-destructive/60"
        onClick={() => deleteOneSale(sale.id)}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  )
}

const ListItemLine = ({ sale }: { sale: Sale }) => {
  return (
    <div className="grid w-full gap-2 p-0 text-start hover:bg-transparent md:grid-cols-4 md:place-items-start">
      <span>{sale.description}</span>
      <span>
        {sale.amount.toLocaleString('pt-BR', {
          currency: 'BRL',
          style: 'currency',
        })}
      </span>
      <span className="flex items-center gap-1">
        <UserIcon size={16} /> {sale.employee}
      </span>
      <div className="flex gap-1 text-xs whitespace-nowrap text-zinc-600">
        <CalendarIcon size={16} />
        <p>{dayjs(sale.createdAt).format('DD/MM/YYYY HH:mm')}</p>
      </div>
    </div>
  )
}
