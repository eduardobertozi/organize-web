import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FormLogin } from './components/form-login'
import { redirect } from 'next/navigation'
import { Logo } from '@/components/global/logo'
import { getUser } from '@/actions/user.actions'

export default async function RootPage() {
  const user = await getUser()

  if (user) {
    return redirect('/')
  }

  return (
    <main className="grid h-screen w-full place-items-center px-6">
      <Card className="bg-background/20 w-full max-w-sm border-0 backdrop-blur-md">
        <CardHeader>
          <Logo className="mb-8 h-12" />

          <CardTitle>Entrar</CardTitle>
          <CardDescription>
            Entre com seu usuário e senha para acessar o sistema.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormLogin />
        </CardContent>
      </Card>
    </main>
  )
}
