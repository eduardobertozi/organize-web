import { CloseButton } from '@/components/global/close-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ListProducts } from './components/list-products/list-products'

const ProductsPage = async () => {
  return (
    <Card className="container">
      <CardHeader className="gap-4 border-b pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Produtos</CardTitle>

          <CloseButton />
        </div>

        <CardDescription className="text-xs">
          Inclua, edite ou exclua produtos. Para editar basta clicar sobre um
          item da lista.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-full w-full flex-col justify-between">
          <ListProducts />
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductsPage
