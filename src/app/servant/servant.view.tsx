import { PaginatedItemsView } from '@/components/_global/paginated-items/paginated-items.view'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  FloatingInput,
  FloatingLabel,
} from '@/components/ui/expansions/floating-label-input'
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
        <CardContent className="space-y-4">
          <form>
            <div className="relative">
              <FloatingInput id="floating-customize" />
              <FloatingLabel htmlFor="floating-customize">
                Buscar Serviço
              </FloatingLabel>
            </div>
          </form>
          <div className="flex h-full w-full flex-col justify-between">
            <PaginatedItemsView<ServantToJson>
              fetchItems={vm.getServants}
              renderItem={(item) => (
                <li className="w-full list-none border-b p-2" key={item.id}>
                  {item.name}
                </li>
              )}
            />

            <p>Exibindo {vm.servantCount} itens</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
