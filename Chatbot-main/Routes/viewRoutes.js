const express = require('express');

const viewController = require('../Controllers/viewController');
const authController = require('../Controllers/authenticationController');

const router = express.Router();

router.get('/', viewController.getHomePage);

router.get('/login', viewController.getLoginPage);

module.exports = router;
