const router = require('express').Router();
const { users } = require('../controllers');
const { requireAuth } = require('../middleware');

/*
 * NOTE:
 * The requireAuth middleware needs to be invoked below the
 * postOne controller's route. Otherwise, the user will require
 * authentication before making an account. Do you see how that
 * might be a bit problematic? 😆
 */

router.post('/', users.postOne);

router.use('/', requireAuth);

router.get('/', users.getAll);
router.get('/:username', users.getOne);

router.put('/:username', users.putOne);

router.delete('/:username', users.deleteOne);

module.exports = router;
