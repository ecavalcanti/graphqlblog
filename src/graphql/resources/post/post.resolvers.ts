import Post from "../../../models/post"
import User from "../../../models/user"
import Comment from  "../../../models/comment"

export const postResolvers = {
  Post: {
    author: (author: User) => {
      return User.findById(author.get('authorId'))
    },
    comments: (post:Post, {first = 10, offset = 0}) => {
      return Comment.findAll({
        where: { postId: post.get('id') },
        limit: first,
        offset
      })
    }
  },
  Query: {
    posts: (_, {first = 10, offset = 0}) => {
      return Post.findAll({
        limit: first,
        offset
      })
    },
    post: async (_, { id }) => {
      const post = await Post.findById(id)
      if (!post) throw new Error(`Post with id ${id} not found!`)
      return post
    }
  },
  Mutation: {
    createPost:(_, {input}) => {
      return Post.sequelize.transaction(t => {
        return Post.create(input, {transaction: t})
      })
    },
    updatePost:(_, {id, input}) => {
      return Post.sequelize.transaction(async t => {
        const post = await Post.findById(id)
        if (!post) throw new Error(`Post with id ${id} not found!`)
        return post.update(input, {transaction: t})
      })
    },
    deletePost: (_, {id}) => {
      return Post.sequelize.transaction(async t => {
        const post = await Post.findById(id)
        if (!post) throw new Error(`Post with id ${id} not found!`)
        try {
          await post.destroy({transaction: t}) 
          return true
        } catch (error) {
          return false
        }          
      })
    }
  }
}