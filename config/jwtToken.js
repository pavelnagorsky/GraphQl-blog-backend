const jwt = require('jsonwebtoken');

module.exports = (loadedUser) => {
  const token = jwt.sign(
    {
      email: loadedUser.email,
      userId: loadedUser._id.toString()
    }, 
    process.env.JWT_SECRET,
    { 
      expiresIn: "1h"
    }
  );
  return token;
}