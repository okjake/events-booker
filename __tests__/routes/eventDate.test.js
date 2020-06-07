const request = require('supertest');

const app = require('../../server/app');
const connection = require('../../server/database/config/connection');
const buildDB = require('../../server/database/config/build');

describe('get request to /event/date', () => {
  beforeAll(() => buildDB());
  afterAll(() => connection.end());

  it('respond with json containing a list of all events on this day', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/event/date')
      .expect(200)
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .set('Cookie', [`portalToken=${process.env.TOKEN}`]);
    expect(res.body[0]).toStrictEqual({
      category: 'Code Academy',
      date: '2020-06-08T12:00:00.000Z',
      details: 'lorem ipsum',
      duration: 90,
      event_code: 303,
      expired: false,
      id: 2,
      image: 'https://i.imgur.com/VgTVTNA.jpg',
      title: 'Express',
    });
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
