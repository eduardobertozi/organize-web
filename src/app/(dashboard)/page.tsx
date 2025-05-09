import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function RootPage() {
  return (
    <Card className="container">
      <CardHeader>
        <CardTitle>Bem vindo!</CardTitle>
      </CardHeader>
      <CardContent className="flex-col space-y-4 *:flex">
        <Link href="/sales">
          <div className="bg-primary hover:bg-primary/90 h-10 w-full rounded p-2 text-center text-sm">
            Vendas
          </div>
        </Link>
        <Link href="/servants">
          <div className="bg-primary hover:bg-primary/90 h-10 w-full rounded p-2 text-center text-sm">
            Serviços
          </div>
        </Link>
        <Link href="/products">
          <div className="bg-primary hover:bg-primary/90 h-10 w-full rounded p-2 text-center text-sm">
            Produtos
          </div>
        </Link>
        <Link href="/suppliers">
          <div className="bg-primary hover:bg-primary/90 h-10 w-full rounded p-2 text-center text-sm">
            Fornecedores
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
