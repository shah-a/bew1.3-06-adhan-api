const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ message: 'As-Salaamu \'Alaykum :)' });
});

router.get('/login', (req, res) => {
  res.json({ message: 'login' });
});

router.get('/logout', (req, res) => {
  res.json({ message: 'logout' });
});

module.exports = router;
