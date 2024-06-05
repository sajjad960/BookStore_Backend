/* eslint-disable no-unused-vars */
export class Book {
  constructor(
    public title: string,
    public authorIds: number[],
    public publishedDate: Date,
    public description: string
  ) {}
}
