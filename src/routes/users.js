const router = require('express').Router();
const { users } = require('../controllers');

router.get('/', users.getAll);
// router.get('/:id', users.getOne);
router.get('/:username', users.getOne);

router.post('/', users.postOne);

// router.put('/:id', users.putOne);
router.put('/:username', users.putOne);

// router.delete('/:id', users.deleteOne);
router.delete('/:username', users.deleteOne);

module.exports = router;
