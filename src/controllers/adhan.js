const { User, Location } = require('../models');

const get = (req, res) => {
  res.json({ message: 'Adhan' });
};

module.exports = {
  get
};
