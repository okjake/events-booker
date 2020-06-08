const connection = require('../../server/database/config/connection');
const dbBuild = require('../../server/database/config/build');
const { getAdminData } = require('../../server/database/queries/admin');

describe('test for getAdminData query', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('return the admin information', async () => {
    expect.assertions(1);
    const { rows } = await getAdminData();
    const expectedData = {
      name: 'Event Booker Admin',
      img: 'https://i.imgur.com/UTSCK0z.png?1',
    };
    expect(rows).toContainEqual(expectedData);
  });
});
