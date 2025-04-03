import { createServant, updateServant } from '@/actions/servants.actions'
import { ServantsRequest } from '@/types/servants.types'
import { toast } from 'sonner'

export const useServant = (servant: ServantsRequest) => {
  const createNewServant = async () => {
    try {
      const { message } = await createServant(servant)

      toast.success(message)
    } catch (err) {
      const { message } = err as Error
      toast.error(message)
    }
  }

  const updateOneServant = async () => {
    try {
      const { message } = await updateServant(servant)
      toast.success(message)
    } catch (err) {
      const { message } = err as Error
      toast.error(message)
    }
  }

  return {
    createNewServant,
    updateOneServant,
  }
}
