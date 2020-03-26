require('env2')('./config.env');
const { Pool } = require('pg');

let dbUrl;

if (process.env.NODE_ENV === 'test') {
  dbUrl = process.env.TESTDB_URL;
} else if (process.env.NODE_ENV === 'production') {
  dbUrl = process.env.DATABASE_URL;
} else {
  dbUrl = process.env.DEVDB_URL;
}
if (!dbUrl) throw new Error('No Database URL!!!');

const options = {
  connectionString: dbUrl,
  ssl: true,
};

module.exports = new Pool(options);
