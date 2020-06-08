const request = require('supertest');

const moment = require('moment');
const app = require('../../server/app');
const connection = require('../../server/database/config/connection');
const buildDB = require('../../server/database/config/build');
const createEvent = require('../../server/database/queries/events/creatEventSql');

describe('get request to /event/date', () => {
  beforeAll(() => {
    buildDB();
    const today = moment().format('YYYY-MM-DD');
    console.log(today);
    createEvent({
      title: 'test event',
      category: 'Code Academy',
      date: today,
      details: 'lorem',
      duration: '90',
      event_code: '505',
      image: 'https://i.imgur.com/VgTVTNA.jpg',
    });
  });
  afterAll(() => connection.end());

  it('respond with json containing a list of all events on this day', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/event/date')
      .expect(200)
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .set('Cookie', [`portalToken=${process.env.PORTAL_TOKEN}`]);
    expect(res.body[0]).toStrictEqual({ events: 'no events available at GSG' });
    console.log(res.body[0]);
  });

  it("respond with un-auth msg if he doesn't login", async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/event/date')
      .expect(401)
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json');
    expect(res.body).toStrictEqual({ msg: 'un-auth' });
  });
});
