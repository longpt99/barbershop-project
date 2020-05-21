const router = require('express').Router();

const calendarRoute = require('./calendarRoute');

router.use('/calendar', calendarRoute);

module.exports = router;