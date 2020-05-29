const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/userModel');

module.exports.getLogin = (req, res) => {
  res.render('auth/login');
};

module.exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.render('auth/login', {
      error: "User doesn't exist",
    });
    return;
  }

  const valid = await bcrypt.compare(password, user.password);

  if (valid === false) {
    res.render('auth/login', {
      error: 'Wrong password. Try again',
    });
    return;
  }
  res.cookie('userId', user.id, { signed: true });
  res.redirect('/');
};

module.exports.getRegister = (req, res) => {
  res.render('auth/register');
};

module.exports.postRegister = async (req, res) => {
  const { email, password, name, phone } = req.body;
  const validUser = await User.findOne({ email });

  if (validUser) {
    res.render('auth/register', {
      error: 'Account does exist. Please choose the others',
    });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    const idUser = new mongoose.Types.ObjectId();
    User.create(
      {
        _id: idUser,
        name,
        email,
        phone,
        gender: 'male',
        password: hash,
      },
      () => {
        res.cookie('userId', idUser, { signed: true });
        res.redirect('/');
      }
    );
  });
};

module.exports.getLogout = (req, res) => {
  res.clearCookie('userId');
  res.redirect('/');
};
