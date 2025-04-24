import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FormLogin } from './components/form-login'

export default function RootPage() {
  return (
    <main className="grid h-screen w-full place-items-center px-6">
      <Card className="w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Utilize suas credenciais para fazer login
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormLogin />
        </CardContent>
      </Card>
    </main>
  )
}
