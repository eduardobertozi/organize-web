import { PaginatedItemsView } from '@/components/_global/paginated-items/paginated-items.view'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IUseServantViewModel, ServantToJson } from './servant.model'

export const ServantView: React.FC<IUseServantViewModel> = ({ vm }) => {
  return (
    <div className="grid h-screen w-full place-items-center p-6">
      <Card className="container h-full">
        <CardHeader className="flex-row justify-between">
          <CardTitle className="text-2xl font-bold">Serviços</CardTitle>
          <Button
            variant="outline"
            className="text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Fechar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex h-full w-full flex-col justify-between">
            <PaginatedItemsView<ServantToJson>
              fetchItems={vm.getServants}
              fetchFilteredItems={vm.getFilteredServants}
              renderItem={(item) => (
                <li className="w-full list-none border-b p-2" key={item.id}>
                  {item.name}
                </li>
              )}
            />

            <p className="p-2 pt-4 text-end text-sm">
              Exibindo {vm.servantCount} itens
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
