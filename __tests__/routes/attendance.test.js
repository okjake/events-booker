const request = require('supertest');

const app = require('../../server/app');
const connection = require('../../server/database/config/connection');
const buildDB = require('../../server/database/config/build');

describe('patch request to /attendance', () => {
  beforeAll(() => buildDB());
  afterAll(() => connection.end());

  it('attendance with correct eventCode and user with no book on this event', async () => {
    expect.assertions(1);
    const reqBody = {
      userCode: '112',
      eventCode: '302',
    };
    const res = await request(app)
      .patch('/api/v1/attendance')
      .expect(400)
      .send(reqBody)
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .set('Cookie', [`portalToken=${process.env.PORTAL_TOKEN}`]);
    expect(res.body).toStrictEqual({
      msg:
        "user hasn't booked this event yet, please book the event then try again",
    });
  });

  it('attendance with correct eventCode and user with  book on this event', async () => {
    expect.assertions(1);
    const reqBody = {
      userCode: '200',
      eventCode: '302',
    };
    const res = await request(app)
      .patch('/api/v1/attendance')
      .expect(200)
      .send(reqBody)
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .set('Cookie', [`portalToken=${process.env.PORTAL_TOKEN}`]);
    expect(res.body).toStrictEqual({
      msg: 'thanks for attending',
    });
  });
  it('attendance with no inputs (bad req)', async () => {
    expect.assertions(1);
    const res = await request(app)
      .patch('/api/v1/attendance')
      .expect(400)
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .set('Cookie', [`portalToken=${process.env.PORTAL_TOKEN}`]);
    expect(res.body).toStrictEqual({
      msg: 'eventCode is a required field',
    });
  });
});
