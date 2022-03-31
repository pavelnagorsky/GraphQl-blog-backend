const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const userValidation = require('../validators/userValidation');

// signup resolver
exports.createUser = async function({ userInput }) {
  userValidation(userInput);
  try {
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error('User exists already');
      error.code = 401;
      throw error;
    };
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw
    });
    const createdUser = await user.save();
    return { 
      ...createdUser.toJSON(), 
      _id: createdUser._id.toString(),
      createdAt: createdUser.createdAt.toISOString(),
      updatedAt: createdUser.updatedAt.toISOString()
    }
  } catch (err) {
    if (!err.code) {
      err.code = 500;
    }
    throw err
  }
};

// login resolver
exports.login = async function({ email, password }) {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error('User not found');
      error.code = 401;
      throw error;
    };
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Password is incorrect');
      error.code = 401;
      throw error;
    };
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h"}
    );
    return { token: token, userId: user._id.toString() }
  } catch (err) {
    if (!err.code) {
      err.code = 500;
    }
    throw err
  }
};