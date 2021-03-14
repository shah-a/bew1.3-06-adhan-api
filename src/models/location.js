const mongoose = require('mongoose');

const { Schema } = mongoose;

const LocationSchema = new Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const model = mongoose.model('Location', LocationSchema);

module.exports = model;
