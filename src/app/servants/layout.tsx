import { ServantsProvider } from './context/servants.context'

export default function ServantsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ServantsProvider>{children}</ServantsProvider>
}
