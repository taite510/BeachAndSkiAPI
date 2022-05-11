# BeachOrSkiAPI
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
Postgres	![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

A RESTful API for BeachOrSki, a Travel/Weather application.

## Installation

Navigate to the base directory and install the BeachOrSki API dependencies with npm

```bash
  npm install
```

The Postgres connection string is stored in a config.js file that is not provided. This app also requires a free API key from [OpenWeatherMap](https://openweathermap.org/api), which is stored in the same config.js file. Please make a config.js file using the config.example.js file provided and save that file in the base directory.

Then run the schema file to create the table

```bash
  psql -h localhost -f schema.sql
```

To start

```bash
  npm start
```

## Configuration

This API is configured to automatically make calls to the OpenWeatherMap API upon server start and every 10 minutes thereafter. If you wish to change this, navigate to server/index.js and locate the single call to updateCities() and the requestLoop that continually calls updateCities() with an interval of 600000 milliseconds. The single call may be commented out and/or the requestLoop's interval may be changed.
