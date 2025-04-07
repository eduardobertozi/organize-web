import { SuppliersProvider } from './context/suppliers.context'

export default function ServantsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SuppliersProvider>{children}</SuppliersProvider>
}
