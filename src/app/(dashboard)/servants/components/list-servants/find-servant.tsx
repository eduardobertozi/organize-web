'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useServantsContext } from '../../context/servants.context'
import { SearchIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type FindServantProps = {
  className?: string
}

export const FindServant: React.FC<FindServantProps> = ({ className }) => {
  const { fetchServantsByName } = useServantsContext()

  return (
    <div className={cn('w-full space-y-2', className)}>
      <Label htmlFor="find-servant" className="text-sm">
        Buscar Serviço
      </Label>

      <div className="relative">
        <Input
          id="find-servant"
          placeholder="Nome do Serviço..."
          className="w-full pr-10 text-sm placeholder:text-sm"
          type="text"
          onChange={(e) => fetchServantsByName(e.target.value)}
        />
        <SearchIcon size={18} className="absolute top-2 right-2" />
      </div>
    </div>
  )
}
