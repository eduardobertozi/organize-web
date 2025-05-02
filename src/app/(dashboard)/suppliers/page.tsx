import { CloseButton } from '@/components/global/close-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ListSuppliers } from './components/list-suppliers/list-suppliers'

const SuppliersPage = async () => {
  return (
    <Card className="container">
      <CardHeader className="gap-4 border-b pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Fornecedores</CardTitle>

          <CloseButton />
        </div>

        <CardDescription className="text-xs">
          Inclua, edite ou exclua fornecedores. Para editar basta clicar sobre
          um item da lista.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-full w-full flex-col justify-between">
          <ListSuppliers />
        </div>
      </CardContent>
    </Card>
  )
}

export default SuppliersPage
