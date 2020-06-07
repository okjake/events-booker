require('env2')('./config.env');
const request = require('supertest');

const app = require('../../server/app');
const connection = require('../../server/database/config/connection');
const dbBuild = require('../../server/database/config/build');

const { TOKEN } = process.env;

describe('get request to /api/v1/users', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('respond with json containing a list of all users', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .set('Cookie', [`token=${TOKEN}`])
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body[0]).toStrictEqual({
      first_name: 'Ahmed',
      last_name: 'Safi',
      mobile: '0567365545',
      email: 'ahmadhsafi1997@gmail.com',
      location: 'Rafah',
    });
  });
});
