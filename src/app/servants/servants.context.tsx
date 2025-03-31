'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import { FetchServants } from './components/list-servants/list-servants.types'

type ServantsContextProps = {
  servantsResponse: FetchServants | null
  changeServantsResponse: (data: FetchServants | null) => void
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
    useState<FetchServants | null>(null)

  const changeServantsResponse = (data: FetchServants | null) => {
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
