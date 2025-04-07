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
import { FormSupplier } from '../form-supplier/form-supplier'

export const CreateSupplier = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <PlusIcon size={24} /> Novo
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full p-4">
        <SheetHeader>
          <SheetTitle>Fornecedor</SheetTitle>
          <SheetDescription>
            Adicione, edite ou exclua um fornecedor.
          </SheetDescription>
        </SheetHeader>
        <FormSupplier />
      </SheetContent>
    </Sheet>
  )
}
