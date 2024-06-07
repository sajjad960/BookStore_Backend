/* eslint-disable @typescript-eslint/ban-types */
import { BookRepository } from '../../../adapters/secondary/db/mongoose/repositories/BookRepository'
import APIfeaturesMongoose from '../../../utils/APIfeaturesMongoose'
import {
  BookRepositoryPort,
  QueryParamsAndOptions,
} from '../../ports/BookRepositoryPort'
import { Request } from 'express'

export class GetAllBooks {
  private bookRepository: BookRepositoryPort

  constructor() {
    this.bookRepository = new BookRepository()
  }
  async execute(req: Request) {
    const { authorIds, maxprice, minprice } = req.query
    // SET DEFAULT QUERY
    // for author
    if (authorIds) {
      const authorIdsArray = String(authorIds)
        .split(',')
        .map((id) => parseInt(id.trim()))
      req.query.authorIds = { $in: authorIdsArray } as unknown as string
    }
    // for minumum and maximum price
    if (
      (Number(maxprice) === 0 || Number(maxprice) > 0) &&
      (Number(minprice) === 0 || Number(minprice) > 0)
    ) {
      req.query.price = {
        $gte: Number(minprice),
        $lte: Number(maxprice),
      } as unknown as string
      delete req.query.maxprice
      delete req.query.minprice
    } else if (Number(maxprice) === 0 || Number(maxprice) > 0) {
      req.query.price = { $lte: Number(maxprice) } as unknown as string
      delete req.query.maxprice
    } else if (Number(minprice) === 0 || Number(minprice) > 0) {
      req.query.price = { $gte: Number(minprice) } as unknown as string
      delete req.query.minprice
    }

    req.query.status = '1' as string
    req.query.fields = '-status,-__v'
    const withoutRegexFields = ['status', 'authorIds', 'publishedDate', 'price']
    const { requestWithQuery }: { requestWithQuery: Request } =
      new APIfeaturesMongoose(req)
        .filter(withoutRegexFields)
        .sort()
        .limitFields()
        .paginate()

    const query = requestWithQuery?.query as unknown as QueryParamsAndOptions
    const result = await this.bookRepository.getAllBooks(query)
    return {
      books: result?.rows,
      totalBooks: result?.count,
    }
  }
}
