const express = require('express');

const weatherController = require('../Controllers/weatherController');

const router = express.Router();

router.get('/', weatherController.getWeather);

module.exports = router;
