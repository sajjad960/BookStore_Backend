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
