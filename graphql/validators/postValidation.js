const validator = require('validator');

module.exports = postInput => {
  const errors = [];
  if (
    validator.isEmpty(postInput.title) || 
    !validator.isLength(postInput.title, { min: 5, max: 80 } )
  ) {
    errors.push({ message: 'title is invalid, (min 5, max 80 chars)' });
  }
  if (
    validator.isEmpty(postInput.content) || 
    !validator.isLength(postInput.content, { min: 5, max: 2000 } )
  ) {
    errors.push({ message: 'content is invalid, (min 5, max 2000 chars)' });
  }
  if (errors.length > 0) {
    const error = new Error('Invalid Input');
    error.data = errors;
    error.code = 422;
    throw error;
  }
}