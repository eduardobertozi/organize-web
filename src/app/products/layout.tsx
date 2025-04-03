import { ProductsProvider } from './context/products.context'

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProductsProvider>{children}</ProductsProvider>
}
