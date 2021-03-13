const { User } = require('../models');

const getAll = (req, res) => {
  User.find().select('username')
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

const getOne = (req, res) => {
  User.find({ username: req.params.username })
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

const postOne = (req, res) => {
  const newUser = new User(req.body);
  newUser.save()
    .then((user) => {
      res.json({
        message: 'Successfully added account.',
        user: {
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
  // const user = await User.findById(req.params.userId);
  // user.username = req.body.username;
  // user.password = req.body.password;
  // user.save()
  //   .then((result) => {
  //     res.json({
  //       message: 'Successfully updated account.',
  //       user_id: result._id
  //     });
  //   })
  //   .catch((error) => {
  //     res.json({ error: error.message });
  //   });
  res.json({ message: 'Not implemented yet' });
};

const deleteOne = (req, res) => {
  User.findOneAndDelete({ username: req.params.username })
    .then((user) => {
      res.json({
        message: 'Successfully deleted account.',
        user: {
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
