import { Button } from '@/components/ui/button'
import { DeleteButton } from './delete-button'

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
  handleDelete: (servant: Servant) => Promise<void>
  handleEdit: (servant: Servant) => Promise<void>
}

export const ListItem: React.FC<ListItemProps> = ({
  servant,
  handleDelete,
  handleEdit,
}) => {
  return (
    <div
      data-testid="list-item"
      className="flex w-full border-b p-2 py-4 text-sm hover:bg-zinc-900"
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="flex-1 p-0 hover:bg-transparent">
            <p className="w-full text-start">{servant.name}</p>
          </Button>
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
