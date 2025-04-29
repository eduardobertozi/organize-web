'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSuppliersContext } from '../../context/suppliers.context'
import { SearchIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type FindSupplierProps = {
  className?: string
}

export const FindSupplier: React.FC<FindSupplierProps> = ({ className }) => {
  const { fetchSuppliersByName } = useSuppliersContext()

  return (
    <div className={cn('w-full space-y-2', className)}>
      <Label htmlFor="find-supplier" className="text-sm">
        Buscar Fornecedor
      </Label>

      <div className="relative">
        <Input
          id="find-supplier"
          placeholder="Nome do Fornecedor..."
          className="w-full pr-10 text-sm placeholder:text-sm"
          type="text"
          onChange={(e) => fetchSuppliersByName(e.target.value)}
        />
        <SearchIcon size={18} className="absolute top-2 right-2" />
      </div>
    </div>
  )
}
