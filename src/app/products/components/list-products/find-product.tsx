'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useProductsContext } from '../../context/products.context'
import { SearchIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type FindProductProps = {
  className?: string
}

export const FindProduct: React.FC<FindProductProps> = ({ className }) => {
  const { fetchProductsByName } = useProductsContext()

  return (
    <div className={cn('w-full space-y-2', className)}>
      <Label htmlFor="find-product" className="text-sm">
        Buscar Produto
      </Label>

      <div className="relative">
        <Input
          id="find-product"
          placeholder="Nome do Produto..."
          className="w-full pr-10 text-sm placeholder:text-sm"
          type="text"
          onChange={(e) => fetchProductsByName(e.target.value)}
        />
        <SearchIcon size={18} className="absolute top-2 right-2" />
      </div>
    </div>
  )
}
