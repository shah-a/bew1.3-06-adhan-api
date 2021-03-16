const { adhan } = require('../utils');
const { User, Location } = require('../models');

// pseudo-db user and location for testing:
const user = new User({ username: 'username', password: 'password' });
const location = new Location({ name: 'home', lat: 43.203995, long: -79.920850 });

user.locations.push(location);
location.user = user._id;

const get = (req, res) => {
  res.json({ message: 'Adhan' });
};

module.exports = {
  get
};
