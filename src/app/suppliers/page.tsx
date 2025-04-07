import { CloseButton } from '@/components/global/close-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ListSuppliers } from './components/list-suppliers/list-suppliers'

export const SuppliersPage = async () => {
  return (
    <div className="flex h-screen w-full items-center justify-center px-6">
      <Card className="container">
        <CardHeader className="gap-4 border-b pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Fornecedores</CardTitle>

            <CloseButton />
          </div>

          <CardDescription className="text-xs">
            Inclua, edite ou exclua fornecedores.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-full w-full flex-col justify-between">
            <ListSuppliers />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SuppliersPage
