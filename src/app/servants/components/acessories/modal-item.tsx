'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

type ModalItemProps = {
  trigger: React.JSX.Element
  formItem: React.JSX.Element
}

export const ModalItem: React.FC<ModalItemProps> = ({ trigger, formItem }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="bottom" className="p-4">
        <SheetHeader>
          <SheetTitle>Serviço</SheetTitle>

          <SheetDescription>
            Adicione, edite ou exclua um serviço.
          </SheetDescription>
        </SheetHeader>

        {formItem}
      </SheetContent>
    </Sheet>
  )
}
