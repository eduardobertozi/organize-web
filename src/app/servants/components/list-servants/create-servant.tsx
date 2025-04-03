import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { PlusIcon } from 'lucide-react'
import { FormServant } from '../form-servant/form-servant'

export const CreateServant = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <PlusIcon size={24} /> Novo Serviço
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="p-4">
        <SheetHeader>
          <SheetTitle>Serviço</SheetTitle>
          <SheetDescription>
            Adicione, edite ou exclua um serviço.
          </SheetDescription>
        </SheetHeader>
        <FormServant />
      </SheetContent>
    </Sheet>
  )
}
