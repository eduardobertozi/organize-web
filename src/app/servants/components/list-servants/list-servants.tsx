'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { FindServant } from '../acessories/find-servant'
import { FormServant } from '../form-servant/form-servant'
import { ListItem } from '../acessories/list-item'
import { useListServants } from './use-list-servants'
import { PlusIcon } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export const ListServants = () => {
  const vm = useListServants()

  return (
    <div className="space-y-4">
      <FindServant handleSearch={vm.handleFetchServantByName} />

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

          <FormServant createServant={vm.handleCreateServant} />
        </SheetContent>
      </Sheet>

      <ScrollArea className="h-[300px]">
        {vm.isPending && <Skeleton className="mt-4 h-10 w-full" />}

        {vm.servantsResponse &&
          !vm.isPending &&
          vm.servantsResponse?.servants?.map((servant) => (
            <ListItem
              servant={servant}
              key={servant.id}
              handleDelete={vm.handleDeleteServant}
              handleEdit={vm.handleEditServant}
            />
          ))}

        {vm.servantsResponse?.next && (
          <Button
            onClick={() => vm.handleFetchAllServants(vm.servantsResponse?.next)}
            variant="outline"
            className="z-20 my-10 w-full"
          >
            Ver mais
          </Button>
        )}
      </ScrollArea>

      <p className="text-xs text-zinc-300">
        Exibindo {vm.servantsResponse?.servants?.length} de{' '}
        {vm.servantsResponse?.total} serviços
      </p>
    </div>
  )
}
