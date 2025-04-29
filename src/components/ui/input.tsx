'use client'

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { useState } from 'react'

export const inputCn = [
  'border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
]

type InputProps = React.ComponentProps<'input'> & {
  icon?: LucideIcon
  isPassword?: boolean
}

function Input({
  className,
  type,
  isPassword = false,
  icon: Icon,
  ...props
}: InputProps) {
  const [inputType, setInputType] = useState(type)
  const iconStyle = Icon ? 'pl-10' : ''
  const isPasswordStyle = isPassword ? 'pr-20' : ''

  return (
    <div className="relative">
      {Icon && (
        <Icon
          className="text-muted-foreground absolute top-1/2 left-2 -translate-y-1/2"
          size={20}
        />
      )}

      <input
        {...props}
        type={inputType}
        data-slot="input"
        className={cn(...inputCn, iconStyle, isPasswordStyle, className)}
        autoComplete="off"
      />

      {isPassword && (
        <button
          className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2 text-sm"
          type="button"
          onClick={() =>
            setInputType((prev) => (prev === 'password' ? 'text' : 'password'))
          }
        >
          {inputType === 'password' ? 'Mostrar' : 'Esconder'}
        </button>
      )}
    </div>
  )
}

export { Input }
