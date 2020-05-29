const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  password: String,
  gender: String,
  isAdmin: Boolean,
  created: Date,
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
