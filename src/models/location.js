const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  // lat: { type: ???, required: true },
  // lon: { type: ???, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const model = mongoose.model('Location', LocationSchema);

module.exports = model;
