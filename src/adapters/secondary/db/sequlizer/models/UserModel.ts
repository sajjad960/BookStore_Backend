/* eslint-disable no-unused-vars */
import { DataTypes, Model, Optional } from 'sequelize'
import { User } from '../../../../../core/domain/entities/User'
import { sequelize } from '../MySqlConnection'
import bcrypt from 'bcryptjs'

// Define the attributes that are optional during User creation
interface UserCreationAttributes
  extends Optional<
    User,
    | 'id'
    | 'passwordChangedAt'
    | 'passwordResetToken'
    | 'passwordResetExpires'
    | 'role'
    | 'active'
  > {}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

// Extend Sequelize's Model class to use User and UserCreationAttributes
class UserModel extends Model<User, UserCreationAttributes> implements User {
  public id!: number
  public name!: string
  public email!: string
  public role!: 'user' | 'admin' | 'moderator'
  public password!: string
  public passwordChangedAt?: Date
  public passwordResetToken?: string
  public passwordResetExpires?: Date
  public active!: number
  public async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
  }
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Please provide a valid email',
        },
      },
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      defaultValue: 'user',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: [8],
          msg: 'Please provide a password with a minimum length of 8 characters',
        },
      },
    },
    passwordChangedAt: {
      type: DataTypes.DATE,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
    },
    active: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
)

export default UserModel
