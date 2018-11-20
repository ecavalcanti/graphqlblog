import { Column, Model, Table, CreatedAt, UpdatedAt, AllowNull, PrimaryKey, AutoIncrement, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import User from './user';

@Table({tableName:'posts'})
export default class Post extends Model<Post> {

  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column
  id?: number

  @AllowNull(false)
  @Column
  title?: string

  @AllowNull(false)
  @Column(DataType.TEXT)
  content?: string

  @Column(DataType.BLOB({
    length: 'long'
  }))
  photo?: string

  @ForeignKey(() => User)
  @Column
  userId:number

  @BelongsTo(() => User)
  author?:User

  @CreatedAt
  @Column
  createdAt?: Date

  @UpdatedAt
  @Column
  updatedAt?: Date

}