const request = require('supertest');

const app = require('../../server/app');
const connection = require('../../server/database/config/connection');
const buildDB = require('../../server/database/config/build');

describe('post request to /login', () => {
  beforeAll(() => buildDB());
  afterAll(() => connection.end());

  it('return status 400 for invalid inputs', async () => {
    expect.assertions(1);
    const reqBody = {
      email: '',
      password: 'admin123',
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

  it('return status 200 for success login', async () => {
    expect.assertions(0);
    const reqBody = {
      email: 'events.booker.ca@gmail.com',
      password: 'admin123',
    };
    const res = await request(app)
      .post('/api/v1/login')
      .send(reqBody)
      .set('Accept', 'application/json')
      .expect(200);
  });

  it('return status 403 for not exist email', async () => {
    expect.assertions(1);
    const reqBody = {
      email: 'events.booker@gmail.com',
      password: 'admin123',
    };
    const res = await request(app)
      .post('/api/v1/login')
      .send(reqBody)
      .set('Accept', 'application/json')
      .expect(403);
    expect(res.body).toStrictEqual({
      msg: 'Email does not exist',
    });
  });

  it('return status 400 for Incorrect password', async () => {
    expect.assertions(1);
    const reqBody = {
      email: 'events.booker.ca@gmail.com',
      password: 'admin',
    };
    const res = await request(app)
      .post('/api/v1/login')
      .send(reqBody)
      .set('Accept', 'application/json')
      .expect(400);
    expect(res.body).toStrictEqual({
      msg: 'password must be at least 8 characters',
    });
  });

  it('return status 403 for Incorrect password', async () => {
    expect.assertions(1);
    const reqBody = {
      email: 'events.booker.ca@gmail.com',
      password: 'admin000',
    };
    const res = await request(app)
      .post('/api/v1/login')
      .send(reqBody)
      .set('Accept', 'application/json')
      .expect(403);
    expect(res.body).toStrictEqual({
      msg: 'incorrect password',
    });
  });
});
