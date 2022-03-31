const Mongoose = require('mongoose');

module.exports = async () => Mongoose.connect(process.env.MONGODB_URL);
