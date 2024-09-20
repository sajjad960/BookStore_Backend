import { User } from '../../core/domain/entities/User'

export type IFile = {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  location: string
  buffer: Buffer
  size: number
}

declare module 'express' {
  interface Request {
    files: IFile[]
  }
}
export interface MyUserRequest extends Request {
  user?: User
  headers: Headers & {
    authorization?: string
  }
}
