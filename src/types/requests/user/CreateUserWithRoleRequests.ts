/* eslint-disable no-unused-vars */
export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}
export type CreateUserWithRoleRequest = {
  name: string
  email: string
  password: string
  role: Roles
}
