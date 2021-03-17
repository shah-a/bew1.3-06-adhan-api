const router = require('express').Router();
const { requireAuth } = require('../middleware');
const { adhan } = require('../controllers');

// Authentication middleware applied to all endpoints
router.use('/', requireAuth);

// GET routes
router.get('/', adhan.getAdhan);

module.exports = router;
