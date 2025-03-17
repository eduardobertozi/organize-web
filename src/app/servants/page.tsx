import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { XIcon } from 'lucide-react'
import { ListServants } from './components/list-servants/list-servants'

export const ServantsPage = async () => {
  return (
    <div className="grid h-screen w-full place-items-center p-6">
      <Card className="container">
        <CardHeader className="gap-4 border-b pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Serviços</CardTitle>

            <Button variant="outline" className="border-zinc-700 text-zinc-300">
              Fechar <XIcon size={24} />
            </Button>
          </div>

          <CardDescription className="text-xs">
            Inclua, edite ou exclua os serviços que você oferece.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-full w-full flex-col justify-between">
            <ListServants />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ServantsPage
