const router = require('express').Router();
const { getCurrentUser, updateCurrentUser } = require('../controllers/user');
const { celebrateUpdateUser } = require('../utils/validation');

router.get('/me', getCurrentUser);
router.patch('/me', celebrateUpdateUser(), updateCurrentUser);

module.exports = router;
