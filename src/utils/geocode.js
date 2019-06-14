const request = require('request');

const geocode = (address, callback) => {
  const urlMapBox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicGFqYXBhdGFrIiwiYSI6ImNqd3JwaHJnbDBmcDQzenA1cjFlZTQ1dWcifQ.pHfd-irVgHek0g2Jo5rn7w&limit=1`;

  request({ url: urlMapBox, json: true }, (err, res) => {
    if (err) {
      return callback(err);
    }

    if (res.body.features.length === 0) {
      return callback('cannot find location');
    }

    callback(null, {
      long: res.body.features[0].center[0],
      lat: res.body.features[0].center[1],
      location: res.body.features[0].place_name,
    });
  });
};

module.exports = geocode;
