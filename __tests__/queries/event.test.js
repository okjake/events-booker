const connection = require('../../server/database/config/connection');
const dbBuild = require('../../server/database/config/build');
const { getAllEvents } = require('../../server/database/queries/events');
const { createEventSql } = require('../../server/database/queries/events');

describe('test for event queries', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('return an array of all the events', async () => {
    expect.assertions(1);
    const { rows } = await getAllEvents();

    const expectedEvent = {
      category: 'Freelance',
      count: '1',
      date: new Date('2020-06-12 14:30:00'),
      details: 'lorem ipsum',
      duration: 180,
      event_code: 502,
      id: 3,
      image: 'https://i.imgur.com/VgTVTNA.jpg',
      title: 'How to Start freelance',
    };

    expect(rows).toContainEqual(expectedEvent);
  });

  it('return the admin information', async () => {
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
    const res = await createEventSql(reqBody);
    const { rows } = res;

    expect(res.rowCount).toBe(1);
    expect(rows).toHaveLength(0);
  });
});
