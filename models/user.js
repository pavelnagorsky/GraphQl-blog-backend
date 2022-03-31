const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const userShema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "I am new!"
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: "Post"
  }]
}, { timestamps: true });

module.exports = Mongoose.model("User", userShema);