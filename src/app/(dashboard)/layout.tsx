import { getUser } from '@/actions/user.actions'
import { Header } from '@/components/global/header'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  if (!user) {
    return redirect('/auth')
  }

  return (
    <div className="flex h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-6">
        {children}
      </main>
    </div>
  )
}
