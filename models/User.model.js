const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    //required
    username: String,
    name: String,
    age: Number,
    password: String,
    googleID: String,
    role: {
      type: String,
      enum: ['GUEST', 'ADMIN'],
      default: 'GUEST',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
