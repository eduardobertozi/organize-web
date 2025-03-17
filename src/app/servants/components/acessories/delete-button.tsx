import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { TrashIcon } from 'lucide-react'

type DeleteButtonProps = React.ComponentProps<typeof Button>

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  className,
  ...props
}) => {
  return (
    <Button {...props} className={cn(className)}>
      <TrashIcon size={16} />
    </Button>
  )
}
