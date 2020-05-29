const express = require('express');

const router = express.Router();

const controller = require('../controllers/adminController');

router.get('/', controller.index);
router.get('/:id', controller.delUser);

module.exports = router;
