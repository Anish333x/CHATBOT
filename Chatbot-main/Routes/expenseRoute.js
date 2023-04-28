const express = require('express');
const expenseController = require('../Controllers/expenseController');

const router = express.Router();

router
  .route('/')
  .get(expenseController.getFirebaseData)
  .post(expenseController.addExpenseData);

module.exports = router;
