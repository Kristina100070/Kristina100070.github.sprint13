const userModel = require('../models/user');

const findUser = (req, res, next) => userModel.find({})
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    next(err);
  });

const findUserById = (req, res, next) => userModel.findOne({
  _id: req.params.userId,
})
// eslint-disable-next-line consistent-return
  .then((user) => {
    if (!user) {
      return next({ status: 404, massage: 'User not found' });
    }
    res.json(user);
  })
  .catch((err) => {
    next(err);
  });

const createUser = (req, res, next) => {
  const user = userModel.create(req.body)
    // eslint-disable-next-line no-shadow
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      next(err);
    });
  return user;
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  userModel.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  userModel.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  findUser,
  findUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
