const { buildSchema } = require('graphql');

const feedSchema = require('./feedSchema');
const userSchema = require('./userSchema');

module.exports = buildSchema(
  feedSchema +
  userSchema +
  `
    type RootQuery {
      login(email: String!, password: String!): AuthData!
      posts(page: Int): PostData!
      post(id: ID!): Post!
      user: User!
    }

    type RootMutation {
      createUser(userInput: UserInputData): User!
      createPost(postInput: PostInputData): Post!
      updatePost(id: ID!, postInput: PostInputData): Post!
      deletePost(id: ID!): Boolean!
      updateStatus(status: String!): User!
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `
)