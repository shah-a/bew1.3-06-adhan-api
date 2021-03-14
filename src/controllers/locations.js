const { Location, User } = require('../models');

const getAll = (req, res) => {
  Location.find({ user: req.user._id }).lean()
    .select(['name', 'lat', 'long'])
    .then((locations) => {
      res.json({ locations });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

const getOne = (req, res) => {
  Location.find({ _id: req.params.locationId, user: req.user._id }).lean()
    .then((location) => {
      res.json({ location });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

const postOne = (req, res) => {
  const newLocation = new Location(req.body);
  newLocation.user = req.user._id;

  newLocation.save()
    .then(() => User.findById(req.user._id))
    .then((user) => {
      user.locations.push(newLocation);
      return user.save();
    })
    .then(() => {
      res.json({
        message: `Successfully added '${newLocation.name}'.`,
        new_location: newLocation
      });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

const putOne = (req, res) => {
  const newName = req.body.name;
  const newLat = req.body.lat;
  const newLong = req.body.long;

  let location;

  Location.findOne({ _id: req.params.locationId, user: req.user._id })
    .then((query) => {
      if (query) {
        location = query;
        location.name = newName;
        location.lat = newLat;
        location.long = newLong;
        location.updatedAt = new Date(); // please see <commit>'s commit message
        return location.save();
      }
      throw new Error('Unauthorized');
    })
    .then((newLocation) => {
      res.json({
        message: `Successfully updated '${location.name}'.`,
        updated_location: newLocation
      });
    })
    .catch((err) => {
      if (err.message === 'Unauthorized') {
        return res.status(401).send({ message: 'Unauthorized.' });
      }
      return res.json({ error: err.message });
    });
};

const deleteOne = (req, res) => {
  Location
    .findOneAndDelete({ _id: req.params.locationId, user: req.user._id }).lean()
    .then((location) => {
      if (location) {
        return res.json({
          message: `Successfully deleted '${location.name}'.`,
          deleted_location: location
        });
      }
      return res.status(401).send({ message: 'Unauthorized.' });
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
