import { Input, inputCn } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'
import { IMaskInput } from 'react-imask'

type InputMaskProps = ComponentProps<typeof Input & typeof IMaskInput>

export const InputMask = ({ className, ...props }: InputMaskProps) => {
  return (
    <IMaskInput
      type="text"
      data-slot="input"
      className={cn(...inputCn, className)}
      {...props}
    />
  )
}
