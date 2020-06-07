require('env2')('./config.env');
const request = require('supertest');

const app = require('../../server/app');
const connection = require('../../server/database/config/connection');
const dbBuild = require('../../server/database/config/build');

const { TOKEN } = process.env;

describe('get request to /api/v1/event', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('respond with json containing a list of all events', () =>
    new Promise((done) => {
      expect.assertions(8);
      request(app)
        .get('/api/v1/event')
        .set('Accept', 'application/json')
        .set('Cookie', [`token=${TOKEN}`])
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          const data = res.body[0];
          expect(data.title).toBe('Express');
          expect(data.event_code).toBe(303);
          expect(data.category).toBe('Code Academy');
          expect(data.details).toBe('lorem ipsum');
          expect(data.image).toBe('https://i.imgur.com/VgTVTNA.jpg');
          expect(data.date).toBe('2020-05-09T12:00:00.000Z');
          expect(data.duration).toBe(90);
          expect(data.count).toBe('0');
          return done();
        });
    }));
});
