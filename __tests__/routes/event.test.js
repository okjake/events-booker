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

  it('create a new event', () =>
    new Promise((done) => {
      expect.assertions(2);
      const reqBody = {
        title: 'How to Think Like a Programmer',
        eventCode: 700,
        category: 'Code Academy',
        details:
          'This event is for the people who are new to the programming field!!!',
        image: 'https://i.imgur.com/VgTVTNA.jpg',
        date: '2020-05-09T12:00:00.000Z',
        duration: 120,
      };
      request(app)
        .post('/api/v1/event')
        .send(reqBody)
        .set('Accept', 'application/json')
        .set('Cookie', [`token=${TOKEN}`])
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          expect(res.statusCode).toBe(200);
          expect(res.text).toBe(
            '{"msg":"Event How to Think Like a Programmer has been created successfully"}'
          );
          return done();
        });
    }));

  it('return bad request with status 400 if the inputs are invalid', () =>
    new Promise((done) => {
      expect.assertions(1);
      const reqBody = {
        title: 'How to Refactor Your code Professionally ',
        event_code: '900',
        category: 'Code Academy',
        details:
          'This event is for the people who are facing problem with Refactoring!!',
        image: 'https://i.imgur.com/VgTVTNA.jpg',
        date: '2020-05-09T12:00:00.000Z',
        duration: 120,
      };
      request(app)
        .post('/api/v1/event')
        .send(reqBody)
        .set('Accept', 'application/json')
        .set('Cookie', [`token=${TOKEN}`])
        .expect(400)
        .end((err, res) => {
          expect(res.text).toBe('{"msg":"invalid inputs"}');
          if (err) throw err;
          return done();
        });
    }));

  it('return bad request with status 400 if an event with the code already exist', () =>
    new Promise((done) => {
      expect.assertions(1);
      const reqBody = {
        title: 'How to Become a professional programmer',
        eventCode: 700,
        category: 'Code Academy',
        details:
          'This event is for the people who are aiming to become a professional programmer',
        image: 'https://i.imgur.com/VgTVTNA.jpg',
        date: '2020-05-09T12:00:00.000Z',
        duration: 120,
      };
      request(app)
        .post('/api/v1/event')
        .send(reqBody)
        .set('Accept', 'application/json')
        .set('Cookie', [`token=${TOKEN}`])
        .expect(400)
        .end((err, res) => {
          console.log(res);
          expect(res.text).toBe(
            '{"msg":"an event with code 700 already exist, try another code"}'
          );
          if (err) throw err;
          return done();
        });
    }));
});
