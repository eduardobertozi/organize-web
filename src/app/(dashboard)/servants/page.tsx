import { CloseButton } from '@/components/global/close-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ListServants } from './components/list-servants/list-servants'

const ServantsPage = async () => {
  return (
    <Card className="container">
      <CardHeader className="gap-4 border-b pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Serviços</CardTitle>

          <CloseButton />
        </div>

        <CardDescription className="text-xs">
          Inclua, edite ou exclua os serviços que você oferece. Para editar
          basta clicar sobre um item da lista.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-full w-full flex-col justify-between">
          <ListServants />
        </div>
      </CardContent>
    </Card>
  )
}

export default ServantsPage
