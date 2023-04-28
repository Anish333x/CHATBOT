const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const port = process.env.PORT;
const host = process.env.NODE_HOST;

const DB = "mongodb://localhost:27017/"

// Connect with firebase database

mongoose
  .connect(DB, {})
  .then(() => {
    console.log('db connection success by node');
  })
  .catch((err) => {
    console.log(`There was some error \nError : ${err.message}`);
  });

const server = app.listen(port, host, () => {
  console.log(`The app is up and running at : http://${host}:${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  // if in development print full error stack
  if (process.env.NODE_ENV == 'development') console.log(err);

  console.log('UNHANDLED REJECTION😫');
  server.close(() => {
    process.exit(1);
  });
});
