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
    // const expectedEvents = [
    //   {
    //     id: 2,
    //     title: 'Express',
    //     category: 'Code Academy',
    //     event_code: 303,
    //     details: 'lorem ipsum',
    //     image: 'https://i.imgur.com/VgTVTNA.jpg',
    //     date: new Date('2020-05-09 15:00:00'),
    //     duration: 90,
    //     count: '0',
    //   },
    //   {
    //     id: 3,
    //     title: 'How to Start freelance',
    //     category: 'Freelance',
    //     event_code: 502,
    //     details: 'lorem ipsum',
    //     image: 'https://i.imgur.com/VgTVTNA.jpg',
    //     date: new Date('2020-06-12 14:30:00'),
    //     duration: 180,
    //     count: '1',
    //   },
    //   {
    //     id: 1,
    //     title: 'ReactJS',
    //     category: 'Code Academy',
    //     event_code: 302,
    //     details: 'lorem ipsum',
    //     image: 'https://i.imgur.com/VgTVTNA.jpg',
    //     date: new Date('2038-01-09 03:14:07'),
    //     duration: 120,
    //     count: '3',
    //   },
    // ];

    expect(rows).toHaveLength(3);
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
