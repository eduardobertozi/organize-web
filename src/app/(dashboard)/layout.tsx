import { getUser } from '@/actions/auth.actions'
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
    <>
      <Header />
      {children}
    </>
  )
}
