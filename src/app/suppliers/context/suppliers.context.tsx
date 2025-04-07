'use client'

import {
  createSupplier,
  deleteSupplier,
  fetchAllSuppliers,
  fetchSupplierByName,
  updateSupplier,
} from '@/actions/suppliers.actions'
import { Supplier, SuppliersRequest } from '@/@types/suppliers.types'
import { debounce, DebouncedFunc } from 'lodash'
import {
  createContext,
  useCallback,
  useContext,
  useState,
  useTransition,
} from 'react'
import { toast } from 'sonner'

type SuppliersContextProps = {
  suppliers: Supplier[]
  page: number
  hasMore: boolean
  total: number
  loading: boolean
  fetchSuppliersByName: DebouncedFunc<(name: string) => Promise<void>>
  fetchSuppliers: () => Promise<void>
  reloadSuppliers: () => Promise<void>
  createNewSupplier: (supplier: SuppliersRequest) => Promise<void>
  updateOneSupplier: (supplier: SuppliersRequest) => Promise<void>
  deleteOneSupplier: (supplierId: string) => Promise<void>
}

const SuppliersContext = createContext<SuppliersContextProps>(
  {} as SuppliersContextProps,
)

export const SuppliersProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)
  const [loading, startTransition] = useTransition()
  const [suppliers, setSuppliers] = useState<Supplier[]>([])

  const fetchSuppliersByName = useCallback(
    debounce(async (name: string) => {
      startTransition(async () => {
        const { suppliers, total, next } = await fetchSupplierByName(name, 1)
        const hasMoreSuppliers = !!next

        setSuppliers(suppliers)
        setPage(1)
        setTotal(total)
        setHasMore(hasMoreSuppliers)
      })
    }, 300),
    [],
  )

  const fetchSuppliers = async () => {
    startTransition(async () => {
      const { suppliers, total, next } = await fetchAllSuppliers(page)
      const hasMoreSuppliers = !!next

      setSuppliers((prev) => [...prev, ...suppliers])
      setPage((prev) => prev + 1)
      setTotal(total)
      setHasMore(hasMoreSuppliers)
    })
  }

  const reloadSuppliers = async () => {
    startTransition(async () => {
      const { suppliers, total, next } = await fetchAllSuppliers(1)
      const hasMoreSuppliers = !!next

      setSuppliers(suppliers)
      setPage(1)
      setTotal(total)
      setHasMore(hasMoreSuppliers)
    })
  }

  const createNewSupplier = async (supplier: SuppliersRequest) => {
    startTransition(async () => {
      try {
        const { message } = await createSupplier(supplier)
        toast.success(message)
      } catch (err) {
        const { message } = err as Error
        toast.error(message)
      }
    })
  }

  const updateOneSupplier = async (supplier: SuppliersRequest) => {
    startTransition(async () => {
      try {
        const { message } = await updateSupplier(supplier)
        toast.success(message)
      } catch (err) {
        const { message } = err as Error
        toast.error(message)
      }
    })
  }

  const deleteOneSupplier = async (supplierId: string) => {
    startTransition(async () => {
      try {
        await deleteSupplier(supplierId)
        await reloadSuppliers()
      } catch (err) {
        const { message } = err as Error
        toast.error(message)
      }
    })
  }

  return (
    <SuppliersContext.Provider
      value={{
        suppliers,
        page,
        hasMore,
        total,
        loading,
        fetchSuppliersByName,
        fetchSuppliers,
        reloadSuppliers,
        createNewSupplier,
        updateOneSupplier,
        deleteOneSupplier,
      }}
    >
      {children}
    </SuppliersContext.Provider>
  )
}

export const useSuppliersContext = () => {
  const context = useContext(SuppliersContext)
  return context
}
