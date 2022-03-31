const User = require('../../models/user');

// get user status resolver
exports.user = async function(args, req) {
  if (!req.isAuth) {
    const error = new Error('Not authenticated!');
    error.code = 401;
    throw error;
  };
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('User not found');
      error.code = 404;
      throw error;
    };
    return {
      ...user.toJSON(),
      _id: user._id.toString(),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    };
  } catch (err) {
    if (!err.code) {
      err.code = 500;
    }
    throw err;
  }
};

// update user status resolver
exports.updateStatus = async function({ status }, req) {
  if (!req.isAuth) {
    const error = new Error('Not authenticated!');
    error.code = 401;
    throw error;
  };
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('User not found');
      error.code = 404;
      throw error;
    };
    user.status = status;
    const updatedUser = await user.save();
    return {
      ...updatedUser.toJSON(),
      _id: updatedUser._id,
      createdAt: updatedUser.createdAt.toISOString(),
      updatedAt: updatedUser.updatedAt.toISOString()
    }
  } catch (err) {
    if (!err.code) {
      err.code = 500;
    }
    throw err;
  }
};