/* eslint-disable jest/no-commented-out-tests */
require('env2')('./config.env');
const request = require('supertest');

const app = require('../../server/app');
const connection = require('../../server/database/config/connection');
const dbBuild = require('../../server/database/config/build');

const { TOKEN } = process.env;

describe('get request to /api/v1/event', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('respond with json containing a list of all events', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/event')
      .set('Accept', 'application/json')
      .set('Cookie', [`token=${TOKEN}`])
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body).toContainEqual({
      category: 'Code Academy',
      count: '0',
      date: new Date('2020-05-09 15:00.00').toJSON(),
      details: 'lorem ipsum',
      duration: 90,
      event_code: 303,
      id: 2,
      image: 'https://i.imgur.com/VgTVTNA.jpg',
      title: 'Express',
    });
  });

  it('create a new event', async () => {
    expect.assertions(1);
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
    const res = await request(app)
      .post('/api/v1/event')
      .send(reqBody)
      .set('Accept', 'application/json')
      .set('Cookie', [`token=${TOKEN}`])
      .expect(200);
    expect(res.body).toStrictEqual({
      msg: 'Event How to Think Like a Programmer has been created successfully',
    });
  });

  it('return bad request with status 400 if the inputs are invalid', async () => {
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
    const res = await request(app)
      .post('/api/v1/event')
      .send(reqBody)
      .set('Accept', 'application/json')
      .set('Cookie', [`token=${TOKEN}`])
      .expect(400);
    expect(res.body).toStrictEqual({
      msg: 'invalid inputs',
    });
  });

  it('return bad request with status 400 if an event with the code already exist', async () => {
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
    const res = await request(app)
      .post('/api/v1/event')
      .send(reqBody)
      .set('Accept', 'application/json')
      .set('Cookie', [`token=${TOKEN}`])
      .expect(400);
    expect(res.body).toStrictEqual({
      msg: 'an event with code 700 already exist, try another code',
    });
  });
});
