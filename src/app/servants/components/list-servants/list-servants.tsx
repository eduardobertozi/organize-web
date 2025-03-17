'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { ModalItem } from '../acessories/modal-item'
import { FindServant } from '../acessories/find-servant'
import { FormServant } from '../form-servant/form-servant'
import { ListItem } from '../acessories/list-item'
import { useListServants } from './use-list-servants'

export const ListServants = () => {
  const vm = useListServants()

  return (
    <div className="space-y-4">
      <FindServant handleSearch={vm.handleFetchServantByName} />
      <ModalItem>
        <FormServant createServant={vm.handleCreateServant} />
      </ModalItem>

      <ScrollArea className="relative h-[300px]">
        <div className="from-background absolute top-0 right-0 left-0 z-10 h-4 bg-gradient-to-b to-transparent" />
        <div className="from-background absolute right-0 bottom-0 left-0 z-10 h-10 bg-gradient-to-t to-transparent" />

        {vm.isPending && <Skeleton className="mt-4 h-10 w-full" />}

        {vm.servants &&
          !vm.isPending &&
          vm.servants.servants.map((servant) => (
            <ListItem
              name={servant.name}
              key={servant.id}
              handleDelete={() => vm.handleDeleteServant(servant)}
            />
          ))}

        {vm.servants?.next && (
          <Button
            onClick={() =>
              vm.handleFetchAllPaginatedServants(vm.servants!.next!)
            }
            variant="outline"
            className="z-20 my-10 w-full"
          >
            Ver mais
          </Button>
        )}
      </ScrollArea>

      <p className="text-xs text-zinc-300">
        Exibindo {vm.servants?.servants.length} de {vm.servants?.total} serviços
      </p>
    </div>
  )
}
