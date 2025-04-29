import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function RootPage() {
  return (
    <main className="grid h-screen w-full place-items-center px-6">
      <Card className="container">
        <CardHeader>
          <CardTitle>Bem vindo!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-primary hover:bg-primary/90 h-10 w-full rounded p-2 text-center text-sm">
            <Link href="/sales">Vendas</Link>
          </div>
          <div className="bg-primary hover:bg-primary/90 h-10 w-full rounded p-2 text-center text-sm">
            <Link href="/servants">Serviços</Link>
          </div>
          <div className="bg-primary hover:bg-primary/90 h-10 w-full rounded p-2 text-center text-sm">
            <Link href="/products">Produtos</Link>
          </div>
          <div className="bg-primary hover:bg-primary/90 h-10 w-full rounded p-2 text-center text-sm">
            <Link href="/suppliers">Fornecedores</Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
