const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const db = require('./controller.js');
const morgan = require('morgan');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/cities', (req, res) => {
  db.getAllCityData((err, response) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(response)
    }
  })
})

app.put('/cities', (req, res) => {
  console.log(req.query)
  db.updateWeather(req.query.type, (err, response) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(response)
    }
  })
})

const requestLoop = setInterval(() => {updateCities()}, 600000)

const updateCities = () => {
  db.updateWeather('beachCities', (err, response) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Beach cities weather updated...')
    }
  });
  db.updateWeather('skiCities', (err, response) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Ski cities weather updated...')
    }
  });
}

updateCities();

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})