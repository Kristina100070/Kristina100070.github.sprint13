const userModel = require('../models/user');

const findUser = (req, res, next) => {
 return userModel.find({})
.then((user) => {
  res.json(user);
})
.catch((err) => {
  next(err);
});
}

const findUserById = (req, res, next) => {
  return userModel.findOne({
    _id: req.params.userId
  })
  .then((user) => {
    if (!user) {
      return next({status: 404, massage: 'User not found'});
    }
    res.json(user);
  })
  .catch((err) => {
    next(err);
  });
}

const createUser = (req, res, next) => {
  const user = userModel.create(req.body)
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    next(err);
  });
  return user;
}

module.exports = {
  findUser,
  findUserById,
  createUser
}