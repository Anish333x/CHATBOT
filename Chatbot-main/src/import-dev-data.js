const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Intents = require('../models/intentModel');

dotenv.config({ path: '../config.env' });

const DB = process.env.DATABASE_CONNECTION_STRING.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB CONNECTION SUCCESSFULL');
  })
  .catch((err) => {
    console.log(err.message);
  });

const intents = JSON.parse(fs.readFileSync('../public/data/intents.json'));

const deleteData = async () => {
  try {
    await Intents.deleteMany();
    console.log('All data deleted');
    process.exit();
  } catch (err) {
    console.log(err.message);
  }
};

const importData = async () => {
  try {
    await Intents.create(intents, { validateBeforeSave: true });

    console.log('ALL DATA LOADED');
    process.exit();
  } catch (err) {
    console.log(err.message);
  }
};

if (process.argv[2] == '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteData();
}
