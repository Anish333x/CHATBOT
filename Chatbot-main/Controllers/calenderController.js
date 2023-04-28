const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });
// Require google from googleapis package.
const { google } = require('googleapis');

// Require oAuth2 from our google instance.
const { OAuth2 } = google.auth;

const AppError = require('../utils/AppError');

exports.createSchedule = async (req, res, next) => {
  console.log('Creating schedule..');
  // authorisation of user

  const oAuth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET
  );

  // Call the setCredentials method on our oAuth2Client instance and set our refresh token.
  oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  // Create a new calender instance.
  const calendar = google.calendar({
    version: process.env.GOOGLE_CALENDER_VERSION,
    auth: oAuth2Client,
  });

  // req.body will contain:
  // startTime
  // endTime
  // task

  const eventStartTime = new Date(req.body.startTime);
  const eventEndTime = new Date(req.body.endTime);

  // TODO get time zone and location according to the user
  const currTimeZone = 'Asia/Calcutta';
  const location = 'Surat, Gujarat';

  // create proper json format and create the schedule
  const event = {
    summary: req.body.task,
    location,
    start: {
      dateTime: eventStartTime,
      currTimeZone,
    },
    end: {
      dateTime: eventEndTime,
      currTimeZone,
    },
  };

  // creating a promise for event creation
  calendar.freebusy.query(
    {
      resource: {
        timeMin: eventStartTime,
        timeMax: eventEndTime,
        timeZone: currTimeZone,
        items: [{ id: 'primary' }],
      },
    },
    (err, response) => {
      // Check for errors in our query and log them if they exist.
      if (err) {
        return next(new AppError(`Free Busy Query Error: ${err}`), 410);
      }

      // Create an array of all events on our calendar during that time.
      const eventArr = response.data.calendars.primary.busy;

      // Check if event array is empty which means we are not busy
      if (eventArr.length === 0)
        // If we are not busy create a new calendar event.
        return calendar.events.insert(
          { calendarId: 'primary', resource: event },
          (err) => {
            // Check for errors and log them if they exist.
            if (err) {
              console.error('Error Creating Calender Event:', err);
              return next(
                new AppError(`Error Creating Calender Event:${err}`),
                411
              );
            }
            // Else log that the event was created.
            console.log('Calendar event successfully created.');
            res.status(200).json({
              status: 'success',
              message: 'calender event successfully created',
            });
          }
        );

      // If event array is not empty log that we are busy.
      console.log(`Sorry I'm busy...`);
      return next(
        new AppError(
          'current time period is already taken, select some other time for your event..'
        ),
        412
      );
    }
  );
};

// Create a dummy event for temp uses in our calendar
// const event = {
//   summary: `OP IS MEETING THIS TIME`,
//   location: `MAHESANA GUJARAT`,
//   description: `I WILL MEET WEITH SOMEBODY SPECIAL THIS TIME OF THE DAY.`,
//   colorId: 1,
//   start: {
//     dateTime: eventStartTime,
//     timeZone: 'Asia/Calcutta',
//   },
//   end: {
//     dateTime: eventEndTime,
//     timeZone: 'Asia/Calcutta',
//   },
// };

// // Check if we a busy and have an event on our calendar for the same time.
// calendar.freebusy.query(
//   {
//     resource: {
//       timeMin: eventStartTime,
//       timeMax: eventEndTime,
//       timeZone: 'Asia/Calcutta',
//       items: [{ id: 'primary' }],
//     },
//   },
//   (err, res) => {
//     // Check for errors in our query and log them if they exist.
//     if (err) return console.error('Free Busy Query Error: ', err);

//     // Create an array of all events on our calendar during that time.
//     const eventArr = res.data.calendars.primary.busy;

//     // Check if event array is empty which means we are not busy
//     if (eventArr.length === 0)
//       // If we are not busy create a new calendar event.
//       return calendar.events.insert(
//         { calendarId: 'primary', resource: event },
//         (err) => {
//           // Check for errors and log them if they exist.
//           if (err) return console.error('Error Creating Calender Event:', err);
//           // Else log that the event was created.
//           return console.log('Calendar event successfully created.');
//         }
//       );

//     // If event array is not empty log that we are busy.
//     return console.log(`Sorry I'm busy...`);
//   }
// );
