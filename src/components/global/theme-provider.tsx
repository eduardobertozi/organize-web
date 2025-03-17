'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeProvider({
  children,
  ...props
}: Readonly<React.ComponentProps<typeof NextThemesProvider>>) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    document.body.classList.add('theme-loading')
    setMounted(true)
    document.body.classList.remove('theme-loading')
  }, [])

  if (!mounted) {
    return null
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
