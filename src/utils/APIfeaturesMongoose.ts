import { Request } from 'express'

class APIfeaturesMongoose {
  requestWithQuery: Request
  constructor(req: Request) {
    this.requestWithQuery = req
  }
  filter() {
    const queryObj = { ...this.requestWithQuery.query }
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach((el) => delete queryObj[el])
    let queryStr = JSON.stringify(queryObj)
    // Replace the operators in the query string with their mongoose equivalents
    // Example: 'gte' -> '$gte'
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    const parsedQuery = JSON.parse(queryStr)
    this.requestWithQuery.query = {...this.requestWithQuery.query, ...parsedQuery}
    return this
  }

  sort() {
    if (this.requestWithQuery.query.sort) {
      this.requestWithQuery.query = { ...this.requestWithQuery.query, sort: this.requestWithQuery.query.sort }
    } else {
      this.requestWithQuery.query = {
        ...this.requestWithQuery.query,
        sort: '-createdAt',
      }
    }
    return this
  }

  paginate() {
    const page = Number(this.requestWithQuery.query.page) * 1 || 1
    const limit = Number(this.requestWithQuery.query.limit) * 1 || 10
    const skip = (page - 1) * limit
    this.requestWithQuery.query = {
      ...this.requestWithQuery.query,
      skip: `${skip}`,
      limit: `${limit}`,
    }
    return this
  }

  limitFields() {
    if (this.requestWithQuery.query.fields) {
      const fields = (this.requestWithQuery.query.fields as string)
      .split(',')
      .join(' ')
      this.requestWithQuery.query = { ...this.requestWithQuery.query, fields }
    } else {
      this.requestWithQuery.query = {
        ...this.requestWithQuery.query,
        fields: '-__v',
      }
    }
    return this
  }
}
export default APIfeaturesMongoose
