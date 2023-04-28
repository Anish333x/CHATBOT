const express = require('express');

const calendarController = require('../Controllers/calenderController');

const router = express.Router();

router.post('/', calendarController.createSchedule);

module.exports = router;
