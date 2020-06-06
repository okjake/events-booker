require('env2')('./config.env');
const request = require('supertest');

const app = require('../../server/app');
const connection = require('../../server/database/config/connection');
const dbBuild = require('../../server/database/config/build');

const { TOKEN } = process.env;

describe('get request to /api/v1/users', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('respond with json containing a list of all users', () =>
    new Promise((done) => {
      expect.assertions(5);
      request(app)
        .get('/api/v1/users')
        .set('Accept', 'application/json')
        .set('Cookie', [`token=${TOKEN}`])
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          const data = res.body[0];
          expect(data.first_name).toBe('Ahmed');
          expect(data.last_name).toBe('Safi');
          expect(data.mobile).toBe('0567365545');
          expect(data.email).toBe('ahmadhsafi1997@gmail.com');
          expect(data.location).toBe('Rafah');
          return done();
        });
    }));
});
