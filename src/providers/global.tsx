import { ProductsProvider } from '@/app/(dashboard)/products/context/products.context'
import { SalesProvider } from '@/app/(dashboard)/sales/components/context/sales.context'
import { ServantsProvider } from '@/app/(dashboard)/servants/context/servants.context'
import { SuppliersProvider } from '@/app/(dashboard)/suppliers/context/suppliers.context'

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
