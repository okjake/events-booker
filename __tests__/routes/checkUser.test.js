const request = require('supertest');

const app = require('../../server/app');
const connection = require('../../server/database/config/connection');
const buildDB = require('../../server/database/config/build');

describe('post request to /checkUser', () => {
  beforeAll(() => buildDB());
  afterAll(() => connection.end());

  it('return status 400 for Invalid mobile number', async () => {
    expect.assertions(1);
    const reqBody = {
      mobile: '0522222222',
      eventCode: '502',
    };
    const res = await request(app)
      .post('/api/v1/checkUser')
      .send(reqBody)
      .set('Accept', 'application/json')
      .expect(400);
    expect(res.body).toStrictEqual({
      msg: 'invalid inputs',
    });
  });

  it('return status 301 for unregistered mobile number', async () => {
    expect.assertions(1);
    const reqBody = {
      mobile: '0597755124',
      eventCode: '502',
    };
    const res = await request(app)
      .post('/api/v1/checkUser')
      .send(reqBody)
      .set('Accept', 'application/json')
      .expect(301);
    expect(res.body).toStrictEqual({
      msg: "user doesn't exist, please register",
    });
  });

  it('return status 400 for Invalid event code', async () => {
    expect.assertions(1);
    const reqBody = {
      mobile: '0567365545',
      eventCode: '509',
    };
    const res = await request(app)
      .post('/api/v1/checkUser')
      .send(reqBody)
      .set('Accept', 'application/json')
      .expect(400);
    expect(res.body).toStrictEqual({
      msg: 'the event you are trying to book does not exist',
    });
  });

  it('return status 400 if the event have already been booked', async () => {
    expect.assertions(1);
    const reqBody = {
      mobile: '0567365545',
      eventCode: '502',
    };
    const res = await request(app)
      .post('/api/v1/checkUser')
      .send(reqBody)
      .set('Accept', 'application/json')
      .expect(400);
    expect(res.body).toStrictEqual({
      msg: 'you have already booked this event',
    });
  });

  // it('return status 201 if booking success', async () => {
  //   expect.assertions(0);
  //   const reqBody = {
  //     mobile: '0567365545',
  //     eventCode: '505',
  //   };
  //   const res = await request(app)
  //     .post('/api/v1/checkUser')
  //     .send(reqBody)
  //     .set('Accept', 'application/json')
  //     .expect(201);
  // });
});
