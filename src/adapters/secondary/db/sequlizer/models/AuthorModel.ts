import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../MySqlConnection'
import { Author } from '../../../../../core/domain/entities/Author'

// Define the attributes that are part of the Author entity

// Define the attributes that are optional during Author creation
interface AuthorCreationAttributes extends Optional<Author, 'id'> {}

// Extend Sequelize's Model class to use Author and AuthorCreationAttributes
class AuthorModel
  extends Model<Author, AuthorCreationAttributes>
  implements Author
{
  public id!: number
  public name!: string
  public email!: string
}

// Initialize the AuthorModel
AuthorModel.init(
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
  },
  {
    sequelize,
    tableName: 'authors',
    timestamps: true,
  }
)

export default AuthorModel
