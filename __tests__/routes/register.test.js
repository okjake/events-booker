const request = require('supertest');

const app = require('../../server/app');
const connection = require('../../server/database/config/connection');
const buildDB = require('../../server/database/config/build');

const throwIfError = (err, res) => {
  if (err) throw err;
};

describe('post request to /register', () => {
  beforeAll(() => buildDB());
  afterAll(() => connection.end());

  it('return status 201 for successful registration', () =>
    new Promise((done) => {
      expect.assertions(1);
      const reqBody = {
        firstName: 'new',
        lastName: 'user',
        email: 'ahmad@hotmail.com',
        mobile: '05123456',
        location: 'Gaza',
      };
      request(app)
        .post('/api/v1/register')
        .send(reqBody)
        .set('Accept', 'application/json')
        .expect(201)
        .end((err, res) => {
          if (err) throw err;
          expect(res.text).toBe('Created');
          return done();
        });
    }));

  it('return bad request with status 400 if email is already taken', () =>
    new Promise((done) => {
      expect.assertions(0);
      const reqBody = {
        firstName: 'new',
        lastName: 'user',
        email: 'ahmad@hotmail.com',
        mobile: '05123456',
        location: 'Gaza',
      };
      request(app)
        .post('/api/v1/register')
        .set('Accept', 'application/json')
        .send(reqBody)
        .expect(400)
        .expect({
          msg: 'email is already taken!',
        })
        .end((err, res) => {
          if (err) throw err;
          return done();
        });
    }));

  it('return bad request with status 400 if mobile number is already taken', () =>
    new Promise((done) => {
      expect.assertions(0);
      const reqBody = {
        firstName: 'new',
        lastName: 'user',
        email: 'newemail@gmail.com',
        mobile: '05123456',
        location: 'Gaza',
      };
      request(app)
        .post('/api/v1/register')
        .set('Accept', 'application/json')
        .send(reqBody)
        .expect(400)
        .expect({
          msg: 'mobile number is already taken!',
        })
        .end((err, res) => {
          if (err) throw err;
          return done();
        });
    }));

  it('return bad request with status 400 if firstName field is missing', () =>
    new Promise((done) => {
      expect.assertions(0);
      const reqBody = {
        firstName: '',
        lastName: 'user',
        email: 'newemail@gmail.com',
        mobile: '0567365545',
        location: 'Gaza',
      };
      request(app)
        .post('/api/v1/register')
        .set('Accept', 'application/json')
        .send(reqBody)
        .expect(400)
        .expect({ msg: 'firstName is a required field' })
        .end((err, res) => {
          if (err) throw err;
          return done();
        });
    }));

  it('return bad request with status 400 if lastName field is missing', () =>
    new Promise((done) => {
      expect.assertions(0);
      const reqBody = {
        firstName: 'new',
        lastName: '',
        email: 'newemail@gmail.com',
        mobile: '0567365545',
        location: 'Gaza',
      };
      request(app)
        .post('/api/v1/register')
        .set('Accept', 'application/json')
        .send(reqBody)
        .expect(400)
        .expect({ msg: 'lastName is a required field' })
        .end((err, res) => {
          if (err) throw err;
          return done();
        });
    }));

  it('return bad request with status 400 if email field is missing', () =>
    new Promise((done) => {
      expect.assertions(0);
      const reqBody = {
        firstName: 'new',
        lastName: 'user',
        email: '',
        mobile: '0567365545',
        location: 'Gaza',
      };
      request(app)
        .post('/api/v1/register')
        .set('Accept', 'application/json')
        .send(reqBody)
        .expect(400)
        .expect({ msg: 'email is a required field' })
        .end((err, res) => {
          if (err) throw err;
          return done();
        });
    }));

  it('return bad request with status 400 if mobile field is missing', () =>
    new Promise((done) => {
      expect.assertions(0);
      const reqBody = {
        firstName: 'new',
        lastName: 'user',
        email: 'newemail@gmail.com',
        mobile: '',
        location: 'Gaza',
      };
      request(app)
        .post('/api/v1/register')
        .set('Accept', 'application/json')
        .send(reqBody)
        .expect(400)
        .expect({ msg: 'mobile is a required field' })
        .end((err, res) => {
          if (err) throw err;
          return done();
        });
    }));

  it('return bad request with status 400 if location field is missing', () =>
    new Promise((done) => {
      expect.assertions(0);
      const reqBody = {
        firstName: 'new',
        lastName: 'user',
        email: 'newemail@gmail.com',
        mobile: '7365545',
        location: '',
      };
      request(app)
        .post('/api/v1/register')
        .set('Accept', 'application/json')
        .send(reqBody)
        .expect(400)
        .expect({ msg: 'location is a required field' })
        .end((err, res) => {
          if (err) throw err;
          return done();
        });
    }));

  it('return bad request with status 400 if mobile number  is invalid', () =>
    new Promise((done) => {
      expect.assertions(0);
      const reqBody = {
        firstName: 'new',
        lastName: 'user',
        email: 'newemail@gmail.com',
        mobile: 'hi world',
        location: 'Gaza',
      };
      request(app)
        .post('/api/v1/register')
        .set('Accept', 'application/json')
        .send(reqBody)
        .expect(400)
        .expect({ msg: 'invalid mobile number' })
        .end((err, res) => {
          if (err) throw err;
          return done();
        });
    }));

  it('return bad request with status 400 if email is invalid', () =>
    new Promise((done) => {
      expect.assertions(0);
      const reqBody = {
        firstName: 'new',
        lastName: 'user',
        email: 'whatever@gmail',
        mobile: '0567365545',
        location: 'Gaza',
      };
      request(app)
        .post('/api/v1/register')
        .set('Accept', 'application/json')
        .send(reqBody)
        .expect(400)
        .expect({ msg: 'email must be a valid email' })
        .end((err, res) => {
          if (err) throw err;
          return done();
        });
    }));
});
