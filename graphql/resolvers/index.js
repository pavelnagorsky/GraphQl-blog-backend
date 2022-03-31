const userResolver = require('./userResolver');
const feedResolver = require('./feedResolver');
const authResolver = require('./authResolver');

const indexResolver = {
  // signup resolver
  createUser: authResolver.createUser,
  // login resolver
  login: authResolver.login,
  // create post resolver
  createPost: feedResolver.createPost,
  // get posts resolver
  posts: feedResolver.posts,
  // get post resolver
  post: feedResolver.post,
  // update post resolver
  updatePost: feedResolver.updatePost,
  //delete post resolver
  deletePost: feedResolver.deletePost,
  // get user status resolver
  user: userResolver.user,
  // update user status resolver
  updateStatus: userResolver.updateStatus
};

module.exports = indexResolver;