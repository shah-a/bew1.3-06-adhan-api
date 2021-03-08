const router = require('express').Router();

router.get('/signup', (req, res) => {
  res.json({ message: "auth" });
});

router.get('/login', (req, res) => {
  res.json({ message: "auth" });
});

router.get('/logout', (req, res) => {
  res.json({ message: "auth" });
});

module.exports = router;
