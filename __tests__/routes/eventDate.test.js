const request = require('supertest');
require('env2')('./config.env');

const app = require('../../server/app');
const connection = require('../../server/database/config/connection');
const buildDB = require('../../server/database/config/build');

describe('get request to /event/date route', () => {
  beforeAll(() => {
    buildDB();
  });
  afterAll(() => connection.end());

  it("respond with un-auth msg if he doesn't login", async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/event/date')
      .set('Accept', 'application/json')
      .expect(401)
      .expect('Content-Type', /json/);
    expect(res.body).toStrictEqual({ msg: 'un-auth' });
  });
});
