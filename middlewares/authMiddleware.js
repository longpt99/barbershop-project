const User = require('../models/userModel');

module.exports.requireAuth = async (req, res, next) => {
  const { userId } = req.signedCookies;
  if (!userId) {
    res.redirect('/login');
    return;
  }
  const user = await User.findOne({ _id: userId });
  if (!user) {
    res.redirect('/login');
    return;
  }
  next();
};

module.exports.validAuth = async (req, res, next) => {
  const { userId } = req.signedCookies;
  if (!userId) {
    next();
    return;
  }
  const user = await User.findById(userId);
  if (!user) {
    next();
    return;
  }

  if (user.isAdmin) {
    res.locals.isAdmin = user.isAdmin;
  }
  res.locals.user = user;
  next();
};

module.exports.validAdmin = (req, res, next) => {
  const { isAdmin } = res.locals;
  if (!isAdmin) {
    res.redirect('/');
    return;
  }
  next();
};
