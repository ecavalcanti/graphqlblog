import { Column, Model, Table, CreatedAt, UpdatedAt, BeforeCreate, AllowNull, PrimaryKey, AutoIncrement, NotEmpty, DataType } from 'sequelize-typescript'
import { genSalt, hash, compare } from 'bcryptjs'

@Table({ tableName: 'users' })
export default class User extends Model<User> {

  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column
  id?: number

  @AllowNull(false)
  @Column(DataType.STRING(128))
  name?: string

  @AllowNull(false)
  @Column(DataType.STRING(128))
  email?: string

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING(128))
  password?: string

  @Column(DataType.BLOB({
    length: 'long'
  }))
  photo?: string

  @CreatedAt
  @Column
  createdAt?: Date

  @UpdatedAt
  @Column
  updatedAt?: Date

  @BeforeCreate
  static async generatePassword(user: User) {
    const salt = await genSalt()
    user.password = await hash(user.password, salt)
  }

  async isPassword(encodedPassword: string, password: string): Promise<boolean> {
    return await compare(password, encodedPassword)
  }

}