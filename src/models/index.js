const mongoose = require('mongoose');

const connectDb = () => {
  mongoose.set('debug', true);
  return mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = {
  connectDb
}
