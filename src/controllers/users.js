const { User } = require('../models');

const getAll = (req, res) => {
  User.find().select('username').lean()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

const getOne = (req, res) => {
  User.find({ username: req.params.username }).lean()
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

const postOne = (req, res) => {
  new User(req.body).save()
    .then((user) => {
      res.json({
        message: 'Successfully added account.',
        new_user: {
          _id: user._id,
          username: user.username
        }
      });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

const putOne = (req, res) => {
  const newUsername = req.body.username;
  const newPassword = req.body.password;

  let user;

  User.findOne({ username: req.params.username }).select(['username', 'password'])
    .then((query) => {
      user = query;
      user.username = newUsername;
      user.password = newPassword;
      return user.save();
    })
    .then((newUser) => {
      res.clearCookie('nToken').json({
        message: `Successfully updated '${req.params.username}'. Please log in again.`,
        updated_user: {
          _id: newUser._id,
          username: newUser.username
        }
      });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

const deleteOne = (req, res) => {
  User.findOneAndDelete({ username: req.params.username }).lean()
    .then((user) => {
      res.clearCookie('nToken').json({
        message: `Successfully deleted '${req.params.username}'. You have been logged out.`,
        deleted_user: {
          _id: user._id,
          username: user.username
        }
      });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

module.exports = {
  getAll,
  getOne,
  postOne,
  putOne,
  deleteOne
};
