'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Product } from '@/types/products.types'
import { TrashIcon } from 'lucide-react'
import { useProductsContext } from '../../context/products.context'
import { FormProduct } from '../form-product/form-product'

type ListItemProps = {
  product: Product
}

export const ListItem: React.FC<ListItemProps> = ({ product }) => {
  const { deleteOneProduct } = useProductsContext()

  return (
    <div data-testid="list-item" className="relative space-y-2">
      <button
        type="button"
        className="text-muted-foreground hover:text-foreground absolute top-2 right-2"
        onClick={() => deleteOneProduct(product.id)}
      >
        <TrashIcon size={16} />
      </button>

      <Sheet>
        <SheetTrigger className="w-full">
          <ProductItem product={product} />
        </SheetTrigger>
        <SheetContent side="left" className="w-full p-4">
          <SheetHeader>
            <SheetTitle>Serviço</SheetTitle>
            <SheetDescription>
              Adicione, edite ou exclua um serviço.
            </SheetDescription>
          </SheetHeader>

          <FormProduct currentProduct={product} />
        </SheetContent>
      </Sheet>

      <div className="pl-2 text-sm text-gray-500">
        <p className="text-xs">{product.reference}</p>
        <p className="text-foreground">{product.name}</p>
        <h3 className="text-primary-foreground text-lg font-bold">
          {product.price.toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
          })}
        </h3>
      </div>
    </div>
  )
}

const ProductItem = ({ product }: { product: Product }) => {
  return <div className="bg-primary h-40 w-full rounded-lg p-4" />
}
