'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Product } from '@/@types/products.types'
import { TrashIcon } from 'lucide-react'
import { useProductsContext } from '../../context/products.context'
import { FormProduct } from '../form-product/form-product'
import Image from 'next/image'

type ListItemProps = {
  product: Product
}

export const ListItem: React.FC<ListItemProps> = ({ product }) => {
  const { deleteOneProduct } = useProductsContext()

  return (
    <div data-testid="list-item" className="relative space-y-2">
      <button
        type="button"
        className="text-foreground hover:text-foreground bg-background/70 absolute top-2 right-2 z-10 rounded p-1 backdrop-blur-md"
        onClick={() => deleteOneProduct(product.id)}
      >
        <TrashIcon size={16} />
      </button>

      <Sheet>
        <SheetTrigger className="w-full">
          <ProductItem product={product} />
        </SheetTrigger>
        <SheetContent side="right" className="w-full p-4">
          <SheetHeader>
            <SheetTitle>Serviço</SheetTitle>
            <SheetDescription>
              Adicione, edite ou exclua um serviço.
            </SheetDescription>
          </SheetHeader>

          <FormProduct currentProduct={product} />
        </SheetContent>
      </Sheet>

      <div className="rounded-lg p-2 text-gray-500">
        <p className="text-xs">{product.reference}</p>
        <p className="text-foreground">{product.name}</p>
        <p className="text-foreground">Estoque: {product.stock} items</p>
        <h3 className="text-primary-foreground pt-2 text-lg font-bold">
          {product.price.toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
          })}
        </h3>
      </div>
    </div>
  )
}

const baseUrl = 'https://pub-e8e7af7f91bd4696800d3166bf60081f.r2.dev/'

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <div className="bg-primary flex min-h-40 w-full items-center justify-center rounded-lg p-4">
      {product.attachments.length > 0 && (
        <Image
          width={200}
          height={200}
          className="rounded object-center"
          src={baseUrl + product.attachments[0].url}
          alt={product.attachments[0].title}
        />
      )}
    </div>
  )
}
