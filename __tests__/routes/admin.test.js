require('env2')('./config.env');
const request = require('supertest');

const app = require('../../server/app');
const connection = require('../../server/database/config/connection');
const dbBuild = require('../../server/database/config/build');

const { TOKEN } = process.env;

describe('get request to /api/v1/admin', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('respond with json containing the admin information', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/admin')
      .set('Accept', 'application/json')
      .set('Cookie', [`token=${TOKEN}`])
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body[0]).toStrictEqual({
      img: 'https://i.imgur.com/UTSCK0z.png?1',
      name: 'Event Booker Admin',
    });
  });
});
