'use client'

import {
  createProduct,
  deleteProduct,
  fetchAllProducts,
  fetchProductByName,
  updateProduct,
} from '@/actions/products.actions'
import { Product, ProductsRequest } from '@/@types/products.types'
import { debounce, DebouncedFunc } from 'lodash'
import {
  createContext,
  useCallback,
  useContext,
  useState,
  useTransition,
} from 'react'
import { toast } from 'sonner'

type ProductsContextProps = {
  products: Product[]
  page: number
  hasMore: boolean
  total: number
  loading: boolean
  fetchProductsByName: DebouncedFunc<(name: string) => Promise<void>>
  fetchProducts: () => Promise<void>
  reloadProducts: () => Promise<void>
  createNewProduct: (product: ProductsRequest) => Promise<void>
  updateOneProduct: (product: ProductsRequest) => Promise<void>
  deleteOneProduct: (productId: string) => Promise<void>
}

const ProductsContext = createContext<ProductsContextProps>(
  {} as ProductsContextProps,
)

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)
  const [loading, startTransition] = useTransition()
  const [products, setProducts] = useState<Product[]>([])

  const fetchProductsByName = useCallback(
    debounce(async (name: string) => {
      startTransition(async () => {
        const { products, total, next } = await fetchProductByName(name, 1)
        const hasMoreProducts = !!next

        setProducts(products)
        setPage(1)
        setTotal(total)
        setHasMore(hasMoreProducts)
      })
    }, 300),
    [],
  )

  const fetchProducts = async () => {
    startTransition(async () => {
      const { products, total, next } = await fetchAllProducts(page)
      const hasMoreProducts = !!next

      setProducts((prev) => [...prev, ...products])
      setPage((prev) => prev + 1)
      setTotal(total)
      setHasMore(hasMoreProducts)
    })
  }

  const reloadProducts = async () => {
    startTransition(async () => {
      const { products, total, next } = await fetchAllProducts(1)
      const hasMoreProducts = !!next

      setProducts(products)
      setPage(1)
      setTotal(total)
      setHasMore(hasMoreProducts)
    })
  }

  const createNewProduct = async (product: ProductsRequest) => {
    startTransition(async () => {
      try {
        /* TODO: implements message when adjusts backend return */
        await createProduct(product)
        toast.success('Produto criado com sucesso!')
      } catch (err) {
        const { message } = err as Error
        toast.error(message)
      }
    })
  }

  const updateOneProduct = async (product: ProductsRequest) => {
    startTransition(async () => {
      try {
        /* TODO: implements message when adjusts backend return */
        await updateProduct(product)
        toast.success('Produto atualizado com sucesso!')
      } catch (err) {
        const { message } = err as Error
        toast.error(message)
      }
    })
  }

  const deleteOneProduct = async (productId: string) => {
    startTransition(async () => {
      try {
        await deleteProduct(productId)
        await reloadProducts()
      } catch (err) {
        const { message } = err as Error
        toast.error(message)
      }
    })
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        page,
        hasMore,
        total,
        loading,
        fetchProductsByName,
        fetchProducts,
        reloadProducts,
        createNewProduct,
        updateOneProduct,
        deleteOneProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => {
  const context = useContext(ProductsContext)
  return context
}
