import { User } from '../../core/domain/entities/User'

export type createUserDTO = {
  name: string
  email: string
  password: string
}

export interface PaginatedUsers {
  rows: User[]
  count: number
}
