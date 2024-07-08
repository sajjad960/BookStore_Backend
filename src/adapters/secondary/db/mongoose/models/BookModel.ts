import mongoose, { Schema } from 'mongoose'
import { Book } from '../../../../../core/domain/entities/Book'

export const BookSchema: Schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    authorIds: { type: [Number], required: true },
    publishedDate: { type: Date, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Number, required: true, default: 1 },
    active: { type: Number, required: true, default: 1 },
    audioLinks: [
      {
        url: { type: String },
        type: { type: String },
        description: { type: String },
      },
    ],
    posterLink: { type: String },
  },
  {
    timestamps: true,
  }
)

export const BookModel = mongoose.model<Book>('Book', BookSchema)
