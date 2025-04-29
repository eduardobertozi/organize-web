'use client'

import { Sale, SalesRequest } from '@/@types/sales.types'
import {
  createSale,
  deleteSale,
  fetchAllSales,
  updateSale,
} from '@/actions/sales.actions'
import { createContext, useContext, useState, useTransition } from 'react'
import { toast } from 'sonner'

type SalesContextProps = {
  sales: Sale[]
  page: number
  hasMore: boolean
  total: number
  loading: boolean
  fetchSales: () => Promise<void>
  reloadSales: () => Promise<void>
  createNewSale: (sale: SalesRequest) => Promise<void>
  updateOneSale: (sale: SalesRequest) => Promise<void>
  deleteOneSale: (saleId: string) => Promise<void>
}

const SalesContext = createContext<SalesContextProps>({} as SalesContextProps)

export const SalesProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)
  const [loading, startTransition] = useTransition()
  const [sales, setSales] = useState<Sale[]>([])

  const fetchSales = async () => {
    startTransition(async () => {
      const { sales, total, next } = await fetchAllSales(page)

      const hasMoreSales = !!next

      setSales((prev) => [...prev, ...sales])
      setPage((prev) => prev + 1)
      setTotal(total)
      setHasMore(hasMoreSales)
    })
  }

  const reloadSales = async () => {
    startTransition(async () => {
      const { sales, total, next } = await fetchAllSales(1)
      const hasMoreSales = !!next

      setSales(sales)
      setPage(1)
      setTotal(total)
      setHasMore(hasMoreSales)
    })
  }

  const createNewSale = async (sale: SalesRequest) => {
    startTransition(async () => {
      try {
        await createSale(sale)
        toast.success('Venda criada com sucesso!')
      } catch (err) {
        const { message } = err as Error
        toast.error(message)
      }
    })
  }

  const updateOneSale = async (sale: SalesRequest) => {
    startTransition(async () => {
      try {
        await updateSale(sale)
        toast.success('Venda atualizada com sucesso!')
      } catch (err) {
        const { message } = err as Error
        toast.error(message)
      }
    })
  }

  const deleteOneSale = async (saleId: string) => {
    startTransition(async () => {
      try {
        await deleteSale(saleId)
        await reloadSales()
      } catch (err) {
        const { message } = err as Error
        toast.error(message)
      }
    })
  }

  return (
    <SalesContext.Provider
      value={{
        sales,
        page,
        hasMore,
        total,
        loading,
        fetchSales,
        reloadSales,
        createNewSale,
        updateOneSale,
        deleteOneSale,
      }}
    >
      {children}
    </SalesContext.Provider>
  )
}

export const useSalesContext = () => {
  const context = useContext(SalesContext)
  return context
}
