const { Client } = require('pg');
const axios = require('axios');
const connectionString = require('../config.js').connectionString
const key = require('../config.js').key
const cities = require('../cities.js')

const client = new Client({
  connectionString,
})

client.connect(err => {
  if (err) {
    console.log('connection error: ', err.stack);
  } else {
    console.log('connected to pg');
  }
})

module.exports = {
  getAllCityData: (cb) => {
    const queryString = 'SELECT * FROM weather.cities';
    client.query(queryString, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, data.rows);
      }
    });
  },
  updateWeather: (type, cb) => {
    axios.all(cities[type].map((city) => axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&exclude=minutely,hourly,daily&appid=${key}&units=imperial`)))
    .then(axios.spread((...results) => {
      let values = '';
      for (let i = 0; i < results.length; i++) {
        const currentCity = cities[type][i]
        const [cityName, state] = cities[type][i].name.split(', ')
        const weatherData = results[i].data.current
        const alerts = results[i].data.alerts !== undefined ? results[i].data.alerts[0].event : null;
        let reason = alerts !== null ? alerts : null;
        if (type === 'beachCities') {
          if (weatherData.temp < 70) {
            reason = 'Too Cold!';
          } else if (weatherData.wind_speed > 20) {
            reason = 'Too Windy!';
          } else if (weatherData.clouds > 10) {
            reason = 'Too Cloudy!';
          }
        } else {
          if (weatherData.temp > 50) {
            reason = 'Not Cold Enough!';
          }
        }

        values += `('${cityName}','${state}','${type}',${currentCity.lat},${currentCity.lon},${weatherData.temp},${weatherData.clouds},${weatherData.wind_speed},'${alerts}','${reason}')`
        if (i !== results.length - 1) {
          values += ','
        }
      }
      const queryString = `INSERT INTO weather.cities (city,state,type,latitude,longitude,temp,clouds,wind_speed,alerts,reason) VALUES ${values} ON CONFLICT (city) DO UPDATE SET temp = excluded.temp, clouds = excluded.clouds, wind_speed = excluded.wind_speed, alerts = excluded.alerts, reason = excluded.reason`;
      client.query(queryString, (err, data) => {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          cb(null, data);
        }
      })
    }))
  }
}