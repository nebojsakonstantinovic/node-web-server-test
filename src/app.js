const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils//forecast');

const app = express();
const pubPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup hbs engine and views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
// Setup stativ dir
app.use(express.static(pubPath));

// app.com

const html = `
  <h1>CAOOOOOOO!!!!</h1>
`;

const json = [
  {
    name: 'Paja',
    age: 19,
  },
  {
    name: 'Maja',
    age: 29,
  },
  {
    name: 'Gaja',
    age: 49,
  },
];

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Paja',
  });
});

// app.com/help
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'HELP',
    message: 'Helppppppp!!',
  });
});

// app.com/about
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About HBS',
    name: 'Paja',
  });
});

// app.com/weather
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    });
  }

  geocode(req.query.address, (error, { long, lat, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(long, lat, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

// test
app.get('/prod', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide seadrch term',
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

// app.com/help/404
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 help',
    name: 'Paja',
  });
});

// app.com/404
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Paja',
  });
});

app.listen(5000, () => {
  console.log('Server is up on port 5000');
});
