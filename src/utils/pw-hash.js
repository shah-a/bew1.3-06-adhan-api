const bcrypt = require('bcryptjs');

function pwHash(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    bcrypt.genSalt(10)
      .then((salt) => bcrypt.hash(this.password, salt))
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch((err) => {
        throw err;
      });
  }
}

function pwCheck(password) {
  return bcrypt.compare(password, this.password);
}

module.exports = {
  pwHash, pwCheck
};
