const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ message: "salaam world :)!" });
});

module.exports = router;
