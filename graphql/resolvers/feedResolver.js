const Post = require('../../models/post');
const User = require('../../models/user');
const postValidation = require('../validators/postValidation');
const clearImage = require('../../util/clearImage');

// create post resolver
exports.createPost = async function({ postInput }, req) {
  if (!req.isAuth) {
    const error = new Error('Not authenticated!');
    error.code = 401;
    throw error;
  }
  postValidation(postInput);
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('Invalid user');
      error.code = 401;
      throw error;
    }
    const post = new Post({
      title: postInput.title,
      content: postInput.content,
      imageUrl: postInput.imageUrl,
      creator: user
    });
    const createdPost = await post.save();
    // user.posts.push(createdPost);
    // await user.save();
    return { 
      ...createdPost.toJSON(),
      _id: createdPost._id.toString(),
      createdAt: createdPost.createdAt.toISOString(),
      updatedAt: createdPost.updatedAt.toISOString()
    };
  } catch (err) {
    if (!err.code) {
      err.code = 500;
    }
    throw err;
  }  
};

// get posts resolver
exports.posts = async function({ page }, req) {
  if (!req.isAuth) {
    const error = new Error('Not authenticated!');
    error.code = 401;
    throw error;
  };
  const currentPage = page || 1;
  const perPage = 2; // number of posts on page
  let totalPosts;
  try {
    const count = await Post
      .find()
      .countDocuments();
    totalPosts = +count;
    const posts = await Post
      .find()
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .populate('creator');
    if (!posts) {
      const error = new Error('Could not find posts');
      error.statusCode = 404;
      throw error;
    };
    const postsDocs = posts.map(post => {
      return {
        ...post.toJSON(),
        _id: post._id.toString(),
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString()
      }
    });
    return { 
      posts: postsDocs,
      totalPosts: totalPosts
    };
  } catch (err) {
    if (!err.code) {
      err.code = 500;
    }
    throw err;
  }
};

// get post resolver
exports.post = async function({ id }, req) {
  if (!req.isAuth) {
    const error = new Error('Not authenticated!');
    error.code = 401;
    throw error;
  };
  try {
    const post = await Post.findById(id).populate('creator');
    if (!post) {
      const error = new Error('Post not found');
      error.code = 404;
      throw error;
    }
    return {
      ...post.toJSON(),
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString()
    }
  } catch (err) {
    if (!err.code) {
      err.code = 500;
    }
    throw err;
  }
};

// update post resolver
exports.updatePost = async function({ id, postInput }, req) {
  if (!req.isAuth) {
    const error = new Error('Not authenticated!');
    error.code = 401;
    throw error;
  };
  try {
    const post = await Post.findById(id).populate('creator');
    if (!post) {
      const error = new Error('Post not found');
      error.code = 404;
      throw error;
    }
    if (post.creator._id.toString() !== req.userId.toString()) {
      const error = new Error('Forbidden to update');
      error.code = 403;
      throw error;
    }
    postValidation(postInput);
    post.title = postInput.title;
    post.content = postInput.content;
    if (postInput.imageUrl !== 'undefined') {
      post.imageUrl = postInput.imageUrl;
    }
    const updatedPost = await post.save();
    return {
      ...updatedPost.toJSON(),
      _id: updatedPost._id.toString(),
      createdAt: updatedPost.createdAt.toISOString(),
      updatedAt: updatedPost.updatedAt.toISOString()
    }
  } catch (err) {
    if (!err.code) {
      err.code = 500;
    }
    throw err;
  }
};

//delete post resolver
exports.deletePost = async function({ id }, req) {
  if (!req.isAuth) {
    const error = new Error('Not authenticated!');
    error.code = 401;
    throw error;
  };
  try {
    const post = await Post.findById(id);
    if (!post) {
      const error = new Error('Post not found');
      error.code = 404;
      throw error;
    };
    if (post.creator.toString() !== req.userId.toString()) {
      const error = new Error('Forbidden to delete');
      error.code = 403;
      throw error;
    };
    clearImage(post.imageUrl);
    await Post.findByIdAndRemove(id);
    const user = await User.findById(req.userId);
    user.posts.pull(id);
    await user.save();
    return true;
  } catch (err) {
    if (!err.code) {
      err.code = 500;
    }
    throw err;
  }
};
