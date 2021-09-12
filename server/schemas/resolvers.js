const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
    },

    user: async (parent, { username }) => {
      const params = username ? { username } : {};
      return User.findOne({params})
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },

    addBook: async (parent, {userId, input}) => {
      console.log(input)
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { savedBooks: {...input}}},
        { new: true }
      );

      return updatedUser;
    }
  }
}
      
module.exports = resolvers;