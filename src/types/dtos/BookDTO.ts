import { Book } from '../../core/domain/entities/Book'

export interface CreateBookDTO {
  title: string
  authorIds: number[]
  publishedDate: Date
  description: string
  price: number
  audioLinks?: {
    url: string
    type: string
    description?: string
  }
  posterLink?: string
}
export interface PaginateBooks {
  rows: Book[]
  count: number
}

export interface BookQueryParamsAndOptions {
  limit: number
  skip: number
  sort: string
  title?: string
  authorIds?: number[]
  publishedDate?: Date
  description?: string
  status?: number
  price?: number
  fields: string
}
