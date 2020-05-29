const User = require('../models/userModel');

module.exports.getProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.render('user/view', {
    userInfo: user,
  });
};

module.exports.fetchData = (req, res) => {
  const { user } = res.locals;
  res.send(user);
};

module.exports.updateProfile = (req, res) => {
  const { id } = req.params;
  User.findByIdAndUpdate(
    id,
    {
      ...req.body,
    },
    () => {
      res.redirect('back');
    }
  );
};
