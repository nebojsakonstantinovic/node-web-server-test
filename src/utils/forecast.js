const request = require('request');

const forecast = (long, lat, callback) => {
  const url = `https://api.darksky.net/forecast/2bacd399f8abc6749952b2887bf25261/${lat},${long}?units=si&lang=hr`;

  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback(err);
    }

    if (res.body.error) {
      callback(res.body.error);
    }

    callback(null, res.body);
  });
};

module.exports = forecast;
