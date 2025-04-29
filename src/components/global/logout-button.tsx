'use client'

import { logout } from '@/actions/auth.actions'
import { Button } from '../ui/button'

export const LogoutButton = () => {
  const handleLogout = async () => {
    await logout()
  }

  return (
    <Button variant="ghost" onClick={handleLogout}>
      Sair
    </Button>
  )
}
