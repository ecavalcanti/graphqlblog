import User from "../../../models/user"
import Post from "../../../models/post"

export const userResolvers = {
  User: {
    posts: (user:User, {first = 10, offset = 0}) => {
      return Post.findAll({
        where: {author: user.get('id')},
        limit: first,
        offset
      })
    }
  },
  Query: {
    users: (_, {first = 10, offset = 0}) => {
      return User.findAll({
        limit: first,
        offset
      })
    },
    user: async (_, {id}) => {
      const user = await User.findById(id)
      if (!user) throw new Error(`User with id ${id} not found!`)
      return user
    }
  },
  Mutation: {
    createUser: (_, {input}) => {
      return User.sequelize.transaction(t => {
        return User.create(input, {transaction: t})
      })
    },
    updateUser: (_, {id, input}) => {
      return User.sequelize.transaction(async t => {
        const user = await User.findById(id)
        if (!user) throw new Error(`User with id ${id} not found!`)
        return user.update(input, {transaction: t})
      })
    },
    updateUserPassword: (_, {id, input}) => {
      return User.sequelize.transaction(async t => {
        const user = await User.findById(id)
        if (!user) throw new Error(`User with id ${id} not found!`)
        return user.update(input, {transaction: t})
          .then(user => !!user)
      })
    },
    deleteUser: (_, {id}) => {
      return User.sequelize.transaction(async t => {
        const user = await User.findById(id)
        if (!user) throw new Error(`User with id ${id} not found!`)
        try {
          await user.destroy({transaction: t}) 
          return true
        } catch (error) {
          return false
        }          
      })
    }
  }
}