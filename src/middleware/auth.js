const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  const token = req.cookies.nToken;
  if (typeof token === 'undefined' || token === null) {
    req.user = null;
    return next();
  }
  jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
    if (err) {
      req.user = null;
      return next();
    }
    req.user = decodedToken;
    return next();
  });
  return next();
};

const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ message: 'Unauthorized.' });
  }
  return next();
};

const requireUnauth = (req, res, next) => {
  if (req.user) {
    return res.status(401).send({ message: `Already logged in as '${req.user.username}'.` });
  }
  return next();
};

module.exports = {
  checkAuth, requireAuth, requireUnauth
};
