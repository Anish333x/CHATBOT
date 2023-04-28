const request = require('request');
const dotenv = require('dotenv');
const AppError = require('../utils/AppError');

dotenv.config({ path: '../config.env' });

exports.getWeather = (req, res, next) => {
  const city_name = req.query.city;
  console.log('CITY NAME', city_name)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=e53992ab316ee4e09c53b064ba96eb64`;
  console.log(url);

  request(url, (err, response, body) => {
    if (err) return next(new AppError(err.message, 420));

    const retData = JSON.parse(response.body);
    console.log('RESSS:', retData);
    const temp = Math.round(retData.main.temp - 272.15);
    const status = retData.weather[0].main;

    if (response.statusCode == 200) {
      res.status(200).json({
        status: 'success',
        message: 'Got your weather information',
        weather: `Temperature is : ${temp}, Weather:  ${status}`,
      });
    } else return next(new AppError('Something went wrong .. ', 421));
  });
};
