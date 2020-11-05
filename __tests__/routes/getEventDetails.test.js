const request = require('supertest');

const app = require('../../server/app');
const connection = require('../../server/database/config/connection');
const buildDB = require('../../server/database/config/build');

describe('get request to /events/:code', () => {
  beforeAll(() => buildDB());
  afterAll(() => connection.end());

  it('should return event details', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/events/302')
      .set('Accept', 'application/json')
      .expect(200);
    expect(res.body).toStrictEqual({
      id: 1,
      title: 'ReactJS',
      category: 'Code Academy',
      event_code: 302,
      details: 'lorem ipsum',
      image: 'https://i.imgur.com/VgTVTNA.jpg',
      date: new Date('2038-01-09 03:14:07').toJSON(),
      duration: 120,
      count: '3',
    });
  });

  it("should return event doesn't exist", async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/events/103')
      .set('Accept', 'application/json')
      .expect(404);
    expect(res.body).toStrictEqual({
      msg: "event with code 103 doesn't exist",
    });
  });

  it('should return invalid event code', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/events/hello')
      .set('Accept', 'application/json')
      .expect(400);
    expect(res.body).toStrictEqual({
      msg: 'event code must be a number of 3 digits',
    });
  });
});
