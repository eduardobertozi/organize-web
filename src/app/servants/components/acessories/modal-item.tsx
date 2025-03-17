'use client'

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

type ModalItemProps = {
  children?: React.ReactNode
}

export const ModalItem: React.FC<ModalItemProps> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          Novo <PlusIcon size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="p-4">
        <SheetHeader>
          <SheetTitle>Serviço</SheetTitle>

          <SheetDescription>
            Adicione, edite ou exclua um serviço.
          </SheetDescription>
        </SheetHeader>

        {children}
      </SheetContent>
    </Sheet>
  )
}
