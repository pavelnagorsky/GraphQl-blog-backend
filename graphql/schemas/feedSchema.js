module.exports = `
  type Post {
    _id: ID!
    title: String!
    content: String!
    imageUrl: String!
    creator: User!
    createdAt: String!
    updatedAt: String!
  }

  type PostData {
    posts: [Post!]!
    totalPosts: Int!
  }

  input PostInputData {
    title: String!
    content: String!
    imageUrl: String!
  }
`