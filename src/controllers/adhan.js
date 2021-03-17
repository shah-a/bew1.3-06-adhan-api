const { adhan } = require('../utils');
const { Location } = require('../models');

const getAll = (req, res) => {
  const { prayer } = req.query;
  const { year, month, day } = req.query;
  const outputs = [];

  Location.find({ user: req.user._id })
    .then((queries) => {
      if (queries.length > 0) {
        queries.forEach((query) => {
          const location = query.name;
          const { lat, long } = query;
          // eslint-disable-next-line object-curly-newline
          outputs.push(adhan({ prayer, location, lat, long, year, month, day }));
        });
        return res.json({ outputs });
      }
      return res.status(404).json({ message: 'No locations found.' });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

const getOne = (req, res) => {
  const { prayer } = req.query;
  const { year, month, day } = req.query;

  Location.findOne({ _id: req.params.locationId, user: req.user._id })
    .then((query) => {
      if (query) {
        const { lat, long } = query;
        // eslint-disable-next-line object-curly-newline
        return res.json(adhan({ prayer, lat, long, year, month, day }));
      }
      return res.status(404).json({ message: 'No location found.' });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

module.exports = { getAll, getOne };
