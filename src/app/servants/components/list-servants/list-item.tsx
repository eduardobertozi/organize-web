'use client'

import dayjs from 'dayjs'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { FormServant } from '../form-servant/form-servant'
import { CalendarIcon, TrashIcon } from 'lucide-react'
import { Servant } from '@/types/servants.types'
import { Button } from '@/components/ui/button'
import { useServantsContext } from '../../context/servants.context'

type ListItemProps = {
  servant: Servant
}

export const ListItem: React.FC<ListItemProps> = ({ servant }) => {
  const { deleteOneServant } = useServantsContext()

  return (
    <div
      data-testid="list-item"
      className="flex w-full gap-4 border-b p-2 py-4 text-sm hover:bg-zinc-900"
    >
      <Sheet>
        <SheetTrigger className="w-full">
          <ListItemLine servant={servant} />
        </SheetTrigger>
        <SheetContent side="left" className="w-full p-4">
          <SheetHeader>
            <SheetTitle>Serviço</SheetTitle>
            <SheetDescription>
              Adicione, edite ou exclua um serviço.
            </SheetDescription>
          </SheetHeader>

          <FormServant currentServant={servant} />
        </SheetContent>
      </Sheet>

      <Button
        type="button"
        variant="outline"
        className="text-destructive/60"
        onClick={() => deleteOneServant(servant.id)}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  )
}

const ListItemLine = ({ servant }: { servant: Servant }) => {
  return (
    <div className="flex w-full flex-1 flex-col items-start p-0 hover:bg-transparent md:flex-row md:items-center md:justify-between">
      <div className="flex w-full gap-4 text-start text-sm">
        <p className="flex-1 md:flex-none">{servant.name}</p>
        <p>
          {servant.price.toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
          })}
        </p>
      </div>

      <div className="flex gap-1 text-xs whitespace-nowrap text-zinc-600">
        <CalendarIcon size={16} />
        <p>{dayjs(servant.createdAt).format('DD/MM/YYYY HH:mm')}</p>
      </div>
    </div>
  )
}
