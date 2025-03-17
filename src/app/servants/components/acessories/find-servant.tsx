'use client'

import {
  FloatingInput,
  FloatingLabel,
} from '@/components/ui/expansions/floating-label-input'

type FindServantProps = {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const FindServant = ({ handleSearch }: FindServantProps) => {
  return (
    <div className="relative w-full">
      <FloatingInput
        id="floating-customize"
        className="flex-1"
        onChange={handleSearch}
      />
      <FloatingLabel htmlFor="floating-customize">Buscar Serviço</FloatingLabel>
    </div>
  )
}
