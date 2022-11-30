const router = require('express').Router();
const { createUser, login } = require('../controllers/user');
const { notFoundController } = require('../controllers/notFoundController');
const userRouter = require('./user');
const auth = require('../middlewares/auth');

router.post('/signup', createUser);
router.post('/signin', login);

router.use(auth)

router.use('/users', userRouter);
router.use(notFoundController);

module.exports = router;