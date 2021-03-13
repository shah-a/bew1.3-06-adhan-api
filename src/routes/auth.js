const router = require('express').Router();
const { requireUnauth } = require('../middleware');
const { auth } = require('../controllers');

router.get('/logout', auth.getLogout);

router.post('/login', requireUnauth, auth.postLogin);

module.exports = router;
