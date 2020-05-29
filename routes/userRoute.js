const express = require('express');

const router = express.Router();
const controller = require('../controllers/userController');

router.get('/data', controller.fetchData);
router.get('/:id', controller.getProfile);
router.post('/:id', controller.updateProfile);

module.exports = router;
