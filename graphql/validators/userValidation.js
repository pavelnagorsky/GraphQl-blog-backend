const validator = require('validator');

module.exports = userInput => {
  const errors = [];
  if (!validator.isEmail(userInput.email)) {
    errors.push({ message: 'email is invalid' });
  }
  if (
    validator.isEmpty(userInput.password) || 
    !validator.isLength(userInput.password, { min: 5, max: 20 } )
  ) {
    errors.push({ message: 'password is invalid, (min 5, max 20 chars)' });
  }
  if (errors.length > 0) {
    const error = new Error('Invalid Input');
    error.data = errors;
    error.code = 422;
    throw error;
  }
}