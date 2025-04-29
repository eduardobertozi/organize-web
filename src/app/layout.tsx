import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import { GlobalProvider } from '@/providers/global'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Organize',
  description: 'Organize seu negócio, otimize seu tempo.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`from-background dark via-background to-primary/60 bg-gradient-to-tr ${inter.className} antialiased`}
      >
        <GlobalProvider>{children}</GlobalProvider>
        <Toaster />
      </body>
    </html>
  )
}
