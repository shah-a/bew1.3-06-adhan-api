const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { pwHash, pwCheck } = require('../utils');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  locations: [{ type: Schema.Types.ObjectId, ref: 'Location' }]
}, { timestamps: true });

UserSchema.plugin(uniqueValidator);
UserSchema.pre('save', pwHash);
UserSchema.methods.pwCheck = pwCheck;

const model = mongoose.model('User', UserSchema);

module.exports = model;
