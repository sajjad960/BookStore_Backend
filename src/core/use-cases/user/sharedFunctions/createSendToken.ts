import jwt from 'jsonwebtoken'
import { User } from '../../../domain/entities/User'
import { jwtConfig } from '../../../../config/config'

const signToken = (id: number) => {
  jwt.sign({ id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn })
}
export default function createSendToken(user: User) {
  const token = signToken(user.id)
}
