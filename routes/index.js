const router = require('express').Router();
const { createUser, login, logout } = require('../controllers/user');
const { notFoundController } = require('../controllers/notFoundController');
const userRouter = require('./user');
const movieRouter = require('./movie');
const auth = require('../middlewares/auth');
const { celebrateCreateUser, celebrateLogin } = require('../utils/validation');

router.post('/signup', celebrateCreateUser(), createUser);
router.post('/signin', celebrateLogin(), login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('/signout', logout);
router.use(notFoundController);

module.exports = router;
