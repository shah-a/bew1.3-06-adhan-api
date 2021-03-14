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
    .populate('locations', ['name', 'lat', 'long'])
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
      res.clearCookie('nToken').json({
        message: `Successfully added '${req.body.username}'. Please log in.`,
        new_user: {
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

  User.findOne({ username: req.params.username })
    .then((query) => {
      user = query;
      user.username = newUsername;
      user.password = newPassword;
      user.updatedAt = new Date(); // please see <commit>'s commit message
      return user.save();
    })
    .then((newUser) => {
      res.clearCookie('nToken').json({
        message: `Successfully updated '${req.params.username}'. Please log in again.`,
        updated_user: {
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
