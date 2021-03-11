const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

// Just putting this here so the app has some kind of homepage :)
router.get('/', (req, res) => {
  res.json({ message: 'As-Salaamu \'Alaykum :)' });
});

router.get('/logout', (req, res) => {
  res.clearCookie('nToken');
  res.json({ message: 'Successfully logged out.' });
});

router.post('/login', async (req, res) => {
  const { username } = req.body;
  const { password } = req.body;

  const user = await User.findOne({ username }, ['username', 'password']);
  if (!user) {
    return res.status(404).json({ message: `User '${username}' is not signed up.` });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const token = jwt.sign(
      { _id: user._id, username: user.username },
      process.env.SECRET,
      { expiresIn: '60 days' }
    );

    res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
    return res.json({ message: `Successfully authenticated. As-Salaamu 'Alaykum, '${username}' :)` });
  }

  return res.status(401).json({ message: 'Incorrect password.' });
});

module.exports = router;
