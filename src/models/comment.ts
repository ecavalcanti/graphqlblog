import { Table, Model, Column, AllowNull, PrimaryKey, AutoIncrement, ForeignKey, DataType, BelongsTo } from "sequelize-typescript";
import Post from "./post";
import User from "./user";

@Table({ tableName: 'comments' })
export default class Comment extends Model<Comment> {

  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column
  id?: number

  @AllowNull(false)
  @Column(DataType.TEXT)
  comment?: string

  @ForeignKey(() => Post)
  @Column
  postId: number

  @BelongsTo(() => Post)
  post: Post

  @ForeignKey(() => User)
  @Column
  userId: number

  @BelongsTo(() => User)
  user: User

}