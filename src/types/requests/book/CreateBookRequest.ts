export interface CreateBookRequest {
  title: string
  authorIds: number[]
  publishedDate: Date
  description: string
  price: number
  audioLinks?: {
    url?: string
    type?: string
    description?: string
  }
  posterLink?: string
}
