const { adhan } = require('../utils');
const { Location } = require('../models');

const getAdhan = (req, res) => {
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

module.exports = { getAdhan };
