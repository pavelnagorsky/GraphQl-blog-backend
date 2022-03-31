module.exports = `
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    status: String!
    posts: [Post!]!
    createdAt: String!
    updatedAt: String!
  }

  input UserInputData {
    email: String!
    name: String!
    password: String!
  }

  type AuthData {
    token: String!
    userId: String!
  }
`