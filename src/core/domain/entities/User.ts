/* eslint-disable no-unused-vars */
export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public role: 'user' | 'admin' | 'moderator' = 'user',
    public password?: string,
    public passwordChangedAt?: Date,
    public passwordResetToken?: string,
    public passwordResetExpires?: Date,
    public active: number = 1
  ) {}
}
