const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const { spawn } = require('child_process');

const AppError = require('./utils/AppError');
const viewRoute = require('./Routes/viewRoutes');
const userRoute = require('./Routes/userRoutes');
const chatRoute = require('./Routes/chatRoutes');
const weatherRoute = require('./Routes/weatherRoute');
const expenseRoute = require('./Routes/expenseRoute');
const calendarRoute = require('./Routes/calendarRoutes');
const globalErrorHandler = require('./Controllers/errorController');

const app = express();

app.use(cors());

app.use(express.json());

// for development logging
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}
/**
 * Right now there is no use for this piece of code
 */
// const getScriptData = (fileName, ...args) => {
//   return new Promise((resolve, reject) => {
//     console.log(args);
//     const python = spawn('python', [fileName, args]);

//     python.on('error', (err) => {
//       console.log(err.message);
//       reject('Could not run your python script');
//     });

//     python.stdout.on('data', (data) => {
//       resolve(data.toString());
//     });

//     python.stdout.on('close', (code) => {
//       reject(code);
//     });
//   });
// };

// add time of requrest to the incomming request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// set the template folder path
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.render('index.html');
// });

// app.get('/login', (req, res) => {
//   res.render('login');
// });

// ////

// ////

app.get('/api/v1/', (req, res) => {
  res.status(200).json({
    status: 'sucecss',
    message: 'Hello from api',
  });
});

app.get('/api/v1/getError', (req, res, next) => {
  next(new AppError('Error sent from error route', 401));
});

app.use('/', viewRoute);
app.use('/api/v1/chat', chatRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/expense', expenseRoute);
app.use('/api/v1/weather', weatherRoute);
app.use('/api/v1/schedule', calendarRoute);
app.use('/', viewRoute);

// After this no route will be accepted
app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl}`);
  // err.status = 'fail';
  // err.statusCode = 404;
  // next(err);
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
