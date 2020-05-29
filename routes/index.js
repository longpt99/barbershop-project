const router = require('express').Router();

const calendarRoute = require('./calendarRoute');
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const adminRoute = require('./adminRoute');

const authMiddleware = require('../middlewares/authMiddleware');

router.use('/', authRoute);
router.use('/profile', authMiddleware.requireAuth, userRoute);
router.use(
  '/admin',
  authMiddleware.requireAuth,
  authMiddleware.validAdmin,
  adminRoute
);
router.use('/calendar', calendarRoute);

module.exports = router;
