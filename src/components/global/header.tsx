import Image from 'next/image'
import { LogoutButton } from './logout-button'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="border-primary/50 w-full border-b backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/">
          <Image
            src="/logo-primary.svg"
            alt="Logo Organize"
            width={450}
            height={100}
            className="h-6 w-auto"
            priority
          />
        </Link>

        <LogoutButton />
      </div>
    </header>
  )
}
