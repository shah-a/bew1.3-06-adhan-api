const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, select: false },
  locations: [{ type: Schema.Types.ObjectId, ref: 'Location' }]
}, { timestamps: true });

UserSchema.pre('save', function generate(next) {
  if (!this.isModified('password')) return next();
  bcrypt.genSalt(10)
    .then((salt) => bcrypt.hash(this.password, salt))
    .then((hash) => {
      this.password = hash;
    })
    .catch((err) => {
      throw err;
    });
  return next();
});

UserSchema.methods.comparePassword = function compare(password, done) {
  bcrypt.compare(password, this.password)
    .then((result) => {
      done(result);
    })
    .catch((err) => {
      throw err;
    });
};

const model = mongoose.model('User', UserSchema);

module.exports = model;
