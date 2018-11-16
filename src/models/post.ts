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



// import * as Sequelize from "sequelize";
// import { IBaseModel } from "./baseModel";
// import { IModel } from "./model";

// export interface IPostAttributes {
//   id?: number,
//   title?: string,
//   content?: string,
//   photo?: string,
//   author?: number,
//   createdAt?: Date,
//   updatedAt?: Date
// }

// export interface IPostInstance extends Sequelize.Instance<IPostAttributes> { }

// export interface IPostModel extends IBaseModel, Sequelize.Model<IPostInstance, IPostAttributes> { }

// export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): IPostModel => {
//   const Post: IPostModel = sequelize.define<IPostInstance, IPostAttributes>('Post', {
//     id: {
//       type: dataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     title: {
//       type: dataTypes.STRING,
//       allowNull: false
//     },
//     content: {
//       type: dataTypes.TEXT,
//       allowNull: false
//     },
//     photo: {
//       type: dataTypes.BLOB({
//         length: 'long'
//       }),
//       allowNull: false
//     }, 
//   }, {
//     tableName: 'posts'
//   })

//   Post.associate = (models: IModel):void => {
//     Post.belongsTo(models.User, {
//       foreignKey: {
//         allowNull: false,
//         field: 'author',
//         name: 'author'
//       }
//     })
//   }

//   return Post
// }