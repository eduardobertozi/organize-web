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
import { FormSale } from '../form-sales/form-sales'

export const CreateSale = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <PlusIcon size={24} /> Nova
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full p-4">
        <SheetHeader>
          <SheetTitle>Venda</SheetTitle>
          <SheetDescription>
            Adicione, edite ou exclua uma venda.
          </SheetDescription>
        </SheetHeader>
        <FormSale />
      </SheetContent>
    </Sheet>
  )
}
