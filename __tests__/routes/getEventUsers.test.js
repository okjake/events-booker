require('env2')('./config.env');
const request = require('supertest');

const app = require('../../server/app');
const connection = require('../../server/database/config/connection');
const buildDB = require('../../server/database/config/build');

const { TOKEN } = process.env;

describe('get request to /events/:eventCode/users', () => {
  beforeAll(() => buildDB());
  afterAll(() => connection.end());

  it('should return unauthorized', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/events/502/users')
      .set('Accept', 'application/json')
      .expect(401);
    expect(res.body).toStrictEqual({ msg: 'un-auth' });
  });

  it('should return all event users', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/events/502/users')
      .set('Accept', 'application/json')
      .set('Cookie', [`token=${TOKEN}`])
      .expect(200);
    expect(res.body).toStrictEqual([
      {
        attendance: false,
        email: 'ahmadhsafi1997@gmail.com',
        first_name: 'Ahmed',
        last_name: 'Safi',
        location: 'Rafah',
        mobile: '0567365545',
      },
    ]);
  });

  it('should return invalid event code', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/events/hello/users')
      .set('Accept', 'application/json')
      .set('Cookie', [`token=${TOKEN}`])
      .expect(400);
    expect(res.body).toStrictEqual({
      msg: 'event code must be a number of 3 digits',
    });
  });
});
