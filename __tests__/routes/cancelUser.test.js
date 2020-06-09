const request = require('supertest');

const app = require('../../server/app');
const connection = require('../../server/database/config/connection');
const buildDB = require('../../server/database/config/build');

describe('post request to /cancelUser', () => {
  beforeAll(() => buildDB());
  afterAll(() => connection.end());

  it('return status 400 for not register mobile number', async () => {
    expect.assertions(1);
    const reqBody = {
      mobile: '0597755124',
      eventCode: '502',
    };
    const res = await request(app)
      .post('/api/v1/cancelUser')
      .send(reqBody)
      .set('Accept', 'application/json')
      .expect(400);
    expect(res.body).toStrictEqual({
      msg: 'This mobile did not register at this event',
    });
  });

  it('return status 400 for invalid inputs', async () => {
    expect.assertions(1);
    const reqBody = {
      mobile: '',
      eventCode: '502',
    };
    const res = await request(app)
      .post('/api/v1/cancelUser')
      .send(reqBody)
      .set('Accept', 'application/json')
      .expect(400);
    expect(res.body).toStrictEqual({
      msg: 'Invalid Inputs!',
    });
  });

  it('return status 200 for success cancellation', async () => {
    expect.assertions(0);
    const reqBody = {
      mobile: '0567365545',
      eventCode: '502',
    };
    const res = await request(app)
      .post('/api/v1/cancelUser')
      .send(reqBody)
      .set('Accept', 'application/json')
      .expect(200);
  });
});
