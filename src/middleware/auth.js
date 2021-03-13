const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.nToken;
  jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized.' });
    }
    req.user = decodedToken;
    return next();
  });
};

const requireUnauth = (req, res, next) => {
  if (req.user) {
    return res
      .status(401)
      .send({ message: `Already logged in as '${req.user.username}'.` });
  }
  return next();
};

module.exports = {
  requireAuth, requireUnauth
};
