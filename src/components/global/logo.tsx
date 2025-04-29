import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ComponentProps } from 'react'

type LogoProps = ComponentProps<'img'> & {
  logoUrl?: string
}

export const Logo = ({
  className,
  logoUrl = '/logo-primary.svg',
  ...props
}: LogoProps) => {
  return (
    <Image
      {...props}
      src={logoUrl}
      alt="Logo Organize"
      width={450}
      height={100}
      className={cn('h-6 w-auto', className)}
      priority
    />
  )
}
