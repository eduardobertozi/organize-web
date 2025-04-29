import { Optional } from '@/utils/optional'

export type AuthResponse = {
  access_token: string
}

export type AuthRequest = {
  username: string
  password: string
}

export type User = {
  id: string
  name: string
  username: string
  password: string
}

export type UserRequest = Optional<User, 'id'>

export type CreateUserResponse = {
  user: User
}
