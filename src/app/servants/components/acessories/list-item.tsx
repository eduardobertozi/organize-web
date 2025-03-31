import { Button } from '@/components/ui/button'
import { DeleteButton } from './delete-button'
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
import { Servant } from '@/app/servants/servant.model'

type ListItemProps = {
  servant: Servant
  handleDelete: (servant: Servant) => void
  handleEdit: (servant: Servant) => void
}

export const ListItem: React.FC<ListItemProps> = ({
  servant,
  handleDelete,
  handleEdit,
}) => {
  return (
    <div
      data-testid="list-item"
      className="flex w-full gap-8 border-b p-2 py-4 text-sm hover:bg-zinc-900"
    >
      <Sheet>
        <SheetTrigger asChild>
          <ListItemLine servant={servant} />
        </SheetTrigger>
        <SheetContent side="bottom" className="p-4">
          <SheetHeader>
            <SheetTitle>Serviço</SheetTitle>
            <SheetDescription>
              Adicione, edite ou exclua um serviço.
            </SheetDescription>
          </SheetHeader>

          <FormServant editServant={handleEdit} defaultServant={servant} />
        </SheetContent>
      </Sheet>

      <DeleteButton
        variant="outline"
        className="text-destructive/60"
        onClick={() => handleDelete(servant)}
      />
    </div>
  )
}

const ListItemLine = ({ servant }: { servant: Servant }) => {
  return (
    <Button
      variant="ghost"
      className="flex flex-1 items-center justify-between p-0 hover:bg-transparent"
    >
      <div className="flex gap-4">
        <p>{servant.name}</p>
        <p>
          {servant.price.toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
          })}
        </p>
      </div>
      <div className="flex gap-4 text-xs text-zinc-600">
        <p>Criado em: {dayjs(servant.createdAt).format('DD/MM/YYYY HH:mm')}</p>
        <p>
          Alterado em: {dayjs(servant.createdAt).format('DD/MM/YYYY HH:mm')}
        </p>
      </div>
    </Button>
  )
}
