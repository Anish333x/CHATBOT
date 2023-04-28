// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');

const database = require('firebase/database');
const catchAsync = require('../utils/catchAsync');
// const firebase = require('firebase');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
firebaseConfig = {
  apiKey: "AIzaSyAcZJ5WmSIyoaojWG8ResAJz2oWboAux-Y",
  authDomain: "cp2chatbot-efaf9.firebaseapp.com",
  databaseURL: "https://cp2chatbot-efaf9-default-rtdb.firebaseio.com",
  projectId: "cp2chatbot-efaf9",
  storageBucket: "cp2chatbot-efaf9.appspot.com",
  messagingSenderId: "803023592856",
  appId: "1:803023592856:web:5600b49f392e6837d71fed",
  measurementId: "G-BH3L40FZ63"
};
// Initialize Firebase

try {
  initializeApp(firebaseConfig);
} catch (e) {
  console.log(err);
}

const firebaseDB = database.getDatabase();

exports.getFirebaseData = catchAsync(async (req, res, next) => {
  const expense = database.ref(firebaseDB, 'expense/expenses');
  const data = await database.get(expense);

  res.status(200).json({
    status: 'success',
    message: 'Got your responses',
    data: data.val(),
  });
});

exports.addExpenseData = catchAsync(async (req, res, next) => {
  const date = req.body.date;
  const title = req.body.title;
  const amount = req.body.amount;

  let length = 0;
  const expense = database.ref(firebaseDB, 'expense/expenses');

  const data = await database.get(expense);

  if (data.exists()) length = data.val().length;

  database.set(database.ref(firebaseDB, 'expense/expenses/' + length), {
    date: date,
    title: title,
    amount: amount,
  });

  res.status(200).json({
    status: 'success',
    message: 'added your expense',
    new_length: length + 1,
  });
});
