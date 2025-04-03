'use client'

import { ServantsResponse } from '@/types/servants.types'
import { createContext, useContext, useState } from 'react'

type ServantsContextProps = {
  servantsResponse: ServantsResponse | null
  changeServantsResponse: (data: ServantsResponse | null) => void
}

const ServantsContext = createContext<ServantsContextProps>(
  {} as ServantsContextProps,
)

export const ServantsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [servantsResponse, setServantsResponse] =
    useState<ServantsResponse | null>(null)

  const changeServantsResponse = (data: ServantsResponse | null) => {
    setServantsResponse(data)
  }

  return (
    <ServantsContext.Provider
      value={{
        servantsResponse,
        changeServantsResponse,
      }}
    >
      {children}
    </ServantsContext.Provider>
  )
}

export const useServantsContext = () => {
  const context = useContext(ServantsContext)

  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider')
  }

  return context
}
