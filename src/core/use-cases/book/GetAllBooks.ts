import { BookRepository } from '../../../adapters/secondary/db/mongoose/repositories/BookRepository'
import APIfeaturesMongoose from '../../../utils/APIfeaturesMongoose'
import { BookRepositoryPort, QueryParamsAndOptions } from '../../ports/BookRepositoryPort'
import { Request } from 'express'


export class GetAllBooks {
  private bookRepository: BookRepositoryPort

  constructor() {
    this.bookRepository = new BookRepository()
  }
  async execute(req: Request) {
    const { authorIds } = req.query;
    if(authorIds) {
      const authorIdsArray = String(authorIds).split(',').map(id => parseInt(id.trim()));
      // eslint-disable-next-line @typescript-eslint/ban-types
      req.query.authorIds = { $in: authorIdsArray } as unknown as string
    }
     // set filters
     req.query.status = "1" as string
     req.query.fields = '-status,-__v'
     const { requestWithQuery }: { requestWithQuery: Request } = new APIfeaturesMongoose(
       req
     )
       .filter(["status", "authorIds"])
       .sort()
       .limitFields()
       .paginate()
 
     // eslint-disable-next-line @typescript-eslint/ban-types
     const query = requestWithQuery?.query as unknown as QueryParamsAndOptions
    const result = await this.bookRepository.getAllBooks(query)
    return {
      books: result?.rows,
      totalBooks: result?.count,
    }
  }
}
