const app = require('./server/index.js');
const supertest = require('supertest');
const allCities = require('./cities.js')

function countCities(citiesObj) {
  let count = 0;
  for (let cityType in citiesObj) {
    count += cityType.length
  }
  return count
}
const numberOfCities = countCities(allCities)

const mockBeachCityData = {}

test('GET /cities will retrieve all cities', async () => {
  await supertest(app).get('/cities')
  .send()
  .expect(200)
  .then((res) => {
    expect(res.body.length).toBe(numberOfCities)
  });
});


test('PUT /cities will update said city type', async () => {
  await supertest(app).put('/cities?type=beachCities')
  .expect(200)
  .then((res) => {
    expect(res.body.command).toBe('INSERT')
    expect(res.body.rowCount).toBe(allCities.beachCities.length)
  });
});