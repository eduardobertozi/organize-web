import { CloseButton } from '@/components/global/close-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ListSales } from './components/list-sales/list-sales'

const SalesPage = async () => {
  return (
    <Card className="container">
      <CardHeader className="gap-4 border-b pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Vendas</CardTitle>

          <CloseButton />
        </div>

        <CardDescription className="text-xs">
          Crie, edite ou exclua uma venda. Para editar basta clicar sobre um
          item da lista.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-full w-full flex-col justify-between">
          <ListSales />
        </div>
      </CardContent>
    </Card>
  )
}

export default SalesPage
