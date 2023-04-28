const express = require('express');

const chatController = require('../Controllers/chatController');

const router = express.Router();

router.post('/', chatController.chat);

module.exports = router;
