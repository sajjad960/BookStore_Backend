import mongoose, { Schema } from 'mongoose'
import { User } from '../../../../../core/domain/entities/User'

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: [true, 'Please provide a valid email'],
    unique: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Number,
    default: 1,
    select: false,
  },
})

export const UserModel = mongoose.model<User>('User', UserSchema)
