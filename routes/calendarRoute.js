const express = require('express');

const router = express.Router();
const controller = require('../controllers/calendarController');

router.get('/', controller.indexCalendar);
router.get('/data', controller.getEvents);
router.post('/data', controller.addEvent);

module.exports = router;
