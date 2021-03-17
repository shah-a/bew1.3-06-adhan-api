const { adhan } = require('../utils');
const { User, Location } = require('../models');

// pseudo-db user and location for testing:
const user = new User({ username: 'username', password: 'password' });
const location = new Location({ name: 'home', lat: 43.203995, long: -79.920850 });

user.locations.push(location);
location.user = user._id;

const getAdhan = (req, res) => {
  const { prayerTime } = req.query;
  // const { locationId } = req.query;
  const { lat, long } = location;
  const { year, month, day } = req.query;

  // eslint-disable-next-line object-curly-newline
  const result = adhan({ prayerTime, lat, long, year, month, day });

  res.json({ message: 'Adhan' });
};

// Location.find({ name: blah }).lean()
//   .then((loc) => {
//     new Coordinates(loc.lat, loc.long)
//   })
//   .catch((err) => {
//     res.json({ error: err.message });
//   });

module.exports = { getAdhan };
