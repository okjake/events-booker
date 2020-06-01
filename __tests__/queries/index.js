const connection = require('../../server/database/config/connection');
const buildDB = require('../../server/database/config/build');
const { getUsers } = require('../../server/database/queries/users');

describe('trivial test for queries', () => {
  beforeAll(() => buildDB());
  afterAll(() => connection.end());

  it('return all 4 users', async () => {
    expect.assertions(1);
    const { rows } = await getUsers();
    const expectedUsers = [
      {
        first_name: 'Ahmed',
        last_name: 'Safi',
        mobile: '0567365545',
        email: 'ahmadhsafi1997@gmail.com',
        location: 'Rafah',
      },
      {
        first_name: 'Jack',
        last_name: 'Smith',
        mobile: '0500000000',
        email: 'jack@gmail.com',
        location: 'Khan',
      },
      {
        first_name: 'John',
        last_name: 'Doe',
        mobile: '0511111111',
        email: 'john@gmail.com',
        location: 'Gaza',
      },
      {
        first_name: 'Oyama',
        last_name: 'Kun',
        mobile: '0522222222',
        email: 'kun@hotmail.com',
        location: 'Gaza',
      },
    ];
    expect(rows).toStrictEqual(expectedUsers);
  });
});
