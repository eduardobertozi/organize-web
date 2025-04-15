import { ProductsProvider } from '@/app/products/context/products.context'
import { SalesProvider } from '@/app/sales/components/context/sales.context'
import { ServantsProvider } from '@/app/servants/context/servants.context'
import { SuppliersProvider } from '@/app/suppliers/context/suppliers.context'

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProductsProvider>
      <SuppliersProvider>
        <SalesProvider>
          <ServantsProvider>{children}</ServantsProvider>
        </SalesProvider>
      </SuppliersProvider>
    </ProductsProvider>
  )
}
