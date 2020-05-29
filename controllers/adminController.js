const User = require('../models/userModel');

module.exports.index = async (req, res) => {
  const users = await User.find();
  res.render('user/admin', {
    users,
  });
};

module.exports.delUser = async (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id, () => {
    res.redirect('back');
  });
};
