import { User } from '../../../domain/entities/User'

export default function genarateUserOnlyView(user: User) {
  user.password = undefined
  user.passwordChangedAt = undefined
  user.passwordResetExpires = undefined
  user.passwordResetToken = undefined
  user.createdAt = undefined
  user.updatedAt = undefined

  return user
}
