const request = require('supertest');

const app = require('../../server/app');
const connection = require('../../server/database/config/connection');
const buildDB = require('../../server/database/config/build');

describe('post request to /register', () => {
  beforeAll(() => buildDB());
  afterAll(() => connection.end());

  it('return status 201 for successful registration', async () => {
    expect.assertions(0);
    const reqBody = {
      firstName: 'new',
      lastName: 'user',
      email: 'ahmad@hotmail.com',
      mobile: '05123456',
      location: 'Gaza',
    };
    await request(app)
      .post('/api/v1/register')
      .send(reqBody)
      .set('Accept', 'application/json')
      .expect(201);
  });

  it('return bad request with status 400 if email is already taken', async () => {
    expect.assertions(1);
    const reqBody = {
      firstName: 'new',
      lastName: 'user',
      email: 'ahmad@hotmail.com',
      mobile: '05123456',
      location: 'Gaza',
    };
    const res = await request(app)
      .post('/api/v1/register')
      .set('Accept', 'application/json')
      .send(reqBody)
      .expect(400);
    expect(res.body).toStrictEqual({
      msg: 'email is already taken!',
    });
  });

  it('return bad request with status 400 if mobile number is already taken', async () => {
    expect.assertions(1);
    const reqBody = {
      firstName: 'new',
      lastName: 'user',
      email: 'newemail@gmail.com',
      mobile: '05123456',
      location: 'Gaza',
    };
    const res = await request(app)
      .post('/api/v1/register')
      .set('Accept', 'application/json')
      .send(reqBody)
      .expect(400);
    expect(res.body).toStrictEqual({
      msg: 'mobile number is already taken!',
    });
  });

  it('return bad request with status 400 if firstName field is missing', async () => {
    expect.assertions(1);
    const reqBody = {
      firstName: '',
      lastName: 'user',
      email: 'newemail@gmail.com',
      mobile: '0567365545',
      location: 'Gaza',
    };
    const res = await request(app)
      .post('/api/v1/register')
      .set('Accept', 'application/json')
      .send(reqBody)
      .expect(400);
    expect(res.body).toStrictEqual({ msg: 'firstName is a required field' });
  });

  it('return bad request with status 400 if lastName field is missing', async () => {
    expect.assertions(1);
    const reqBody = {
      firstName: 'new',
      lastName: '',
      email: 'newemail@gmail.com',
      mobile: '0567365545',
      location: 'Gaza',
    };
    const res = await request(app)
      .post('/api/v1/register')
      .set('Accept', 'application/json')
      .send(reqBody)
      .expect(400);
    expect(res.body).toStrictEqual({ msg: 'lastName is a required field' });
  });

  it('return bad request with status 400 if email field is missing', async () => {
    expect.assertions(1);
    const reqBody = {
      firstName: 'new',
      lastName: 'user',
      email: '',
      mobile: '0567365545',
      location: 'Gaza',
    };
    const res = await request(app)
      .post('/api/v1/register')
      .set('Accept', 'application/json')
      .send(reqBody)
      .expect(400);
    expect(res.body).toStrictEqual({ msg: 'email is a required field' });
  });

  it('return bad request with status 400 if mobile field is missing', async () => {
    expect.assertions(1);
    const reqBody = {
      firstName: 'new',
      lastName: 'user',
      email: 'newemail@gmail.com',
      mobile: '',
      location: 'Gaza',
    };
    const res = await request(app)
      .post('/api/v1/register')
      .set('Accept', 'application/json')
      .send(reqBody)
      .expect(400);
    expect(res.body).toStrictEqual({ msg: 'mobile is a required field' });
  });

  it('return bad request with status 400 if location field is missing', async () => {
    expect.assertions(1);
    const reqBody = {
      firstName: 'new',
      lastName: 'user',
      email: 'newemail@gmail.com',
      mobile: '7365545',
      location: '',
    };
    const res = await request(app)
      .post('/api/v1/register')
      .set('Accept', 'application/json')
      .send(reqBody)
      .expect(400);
    expect(res.body).toStrictEqual({ msg: 'location is a required field' });
  });

  it('return bad request with status 400 if mobile number is invalid', async () => {
    expect.assertions(1);
    const reqBody = {
      firstName: 'new',
      lastName: 'user',
      email: 'newemail@gmail.com',
      mobile: 'hi world',
      location: 'Gaza',
    };
    const res = await request(app)
      .post('/api/v1/register')
      .set('Accept', 'application/json')
      .send(reqBody)
      .expect(400);
    expect(res.body).toStrictEqual({ msg: 'invalid mobile number' });
  });

  it('return bad request with status 400 if email is invalid', async () => {
    expect.assertions(1);
    const reqBody = {
      firstName: 'new',
      lastName: 'user',
      email: 'whatever@gmail',
      mobile: '0567365545',
      location: 'Gaza',
    };
    const res = await request(app)
      .post('/api/v1/register')
      .set('Accept', 'application/json')
      .send(reqBody)
      .expect(400);
    expect(res.body).toStrictEqual({ msg: 'email must be a valid email' });
  });
});
