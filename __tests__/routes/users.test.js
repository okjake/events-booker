const request = require('supertest');

const app = require('../../server/app');
const connection = require('../../server/database/config/connection');
const dbBuild = require('../../server/database/config/build');

describe('get request to /users', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('respond with json containing a list of all users', () =>
    new Promise((done) => {
      expect.assertions(0);
      request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    }));
});
