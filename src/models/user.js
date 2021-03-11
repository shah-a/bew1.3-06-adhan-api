const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  locations: [{ type: Schema.Types.ObjectId, ref: 'Location' }]
}, { timestamps: true });

UserSchema.plugin(uniqueValidator);

// eslint-disable-next-line func-names
UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    next();
  } else {
    bcrypt.genSalt(10)
      .then((salt) => bcrypt.hash(this.password, salt))
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch((err) => { throw err; });
  }
});

const model = mongoose.model('User', UserSchema);

module.exports = model;
