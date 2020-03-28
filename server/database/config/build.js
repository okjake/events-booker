const { readFileSync } = require('fs');
const { join } = require('path');

const connection = require('./connection');

const dbBuild = () => {
  const sqlBuild = readFileSync(join(__dirname, 'build.sql')).toString();
  const sqlFake = readFileSync(join(__dirname, 'fakeData.sql')).toString();
  return connection.query(sqlBuild + sqlFake);
};

module.exports = { dbBuild };
