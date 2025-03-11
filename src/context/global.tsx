'use client'

import { createContext, useContext, useMemo } from 'react'

interface CreateGlobalContext {}

export const GlobalContext = createContext<CreateGlobalContext>(
  {} as CreateGlobalContext,
)

interface GlobalProps {
  children: React.ReactNode
}

export const Global = ({ children }: GlobalProps) => {
  const value = useMemo(() => ({}), [])
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider')
  }

  return context
}
