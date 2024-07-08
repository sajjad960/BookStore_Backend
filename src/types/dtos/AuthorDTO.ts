import { Author } from '../../core/domain/entities/Author'

export type createAuthorDTO = {
  name: string
  email: string
}

export interface PaginatedAuthors {
  rows: Author[]
  count: number
}
