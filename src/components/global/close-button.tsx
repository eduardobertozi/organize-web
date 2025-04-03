'use client'

import { XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

export const CloseButton = () => {
  const { replace } = useRouter()

  return (
    <Button
      variant="outline"
      className="border-zinc-700 text-zinc-300"
      onClick={() => replace('/')}
    >
      Fechar <XIcon size={24} />
    </Button>
  )
}
