const request = require('supertest');
require('env2')('./config.env');

const app = require('../../server/app');
const connection = require('../../server/database/config/connection');
const buildDB = require('../../server/database/config/build');

describe('post request to /portal/login', () => {
  beforeAll(() => buildDB());
  afterAll(() => connection.end());

  it('portal login with true input', async () => {
    expect.assertions(1);
    const reqBody = {
      email: 'events.booker.ca@gmail.com',
      pinCode: 'portal123',
    };
    const res = await request(app)
      .post('/api/v1/portal/login')
      .expect(200)
      .send(reqBody)
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .set('Cookie', [`portalToken=${process.env.PORTAL_TOKEN}`]);
    expect(res.body).toStrictEqual({ msg: 'Logged in successfully' });
  });
  it('portal login with incorrect pinCode', async () => {
    expect.assertions(1);
    const reqBody = {
      email: 'events.booker.ca@gmail.com',
      pinCode: 'portal',
    };
    const res = await request(app)
      .post('/api/v1/portal/login')
      .expect(403)
      .send(reqBody)
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json');
    expect(res.body).toStrictEqual({ msg: 'incorrect pin code' });
  });
  it('portal login without inputs', async () => {
    expect.assertions(1);
    const res = await request(app)
      .post('/api/v1/portal/login')
      .expect(400)
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json');
    expect(res.body).toStrictEqual({ msg: 'pinCode is a required field' });
  });
});
