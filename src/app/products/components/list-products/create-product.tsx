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
import { FormProduct } from '../form-product/form-product'

export const CreateServant = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <PlusIcon size={24} /> Novo
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full p-4">
        <SheetHeader>
          <SheetTitle>Serviço</SheetTitle>
          <SheetDescription>
            Adicione, edite ou exclua um serviço.
          </SheetDescription>
        </SheetHeader>
        <FormProduct />
      </SheetContent>
    </Sheet>
  )
}
