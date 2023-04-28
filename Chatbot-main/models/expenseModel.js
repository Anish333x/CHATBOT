const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  item: {
    type: String,
    required: [true, 'Provide an item name where you spent on'],
  },
  price: {
    type: String,
    required: [true, 'Give me a price of that item'],
  },
  date: {
    type: Date(),
    default: Date.now(),
  },
});

module.exports = mongoose.Schema('Expense', expenseSchema);
