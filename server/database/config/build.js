const { readFileSync } = require('fs');
const { join } = require('path');

const connection = require('./connection');

const dbBuild = () => {
  const sqlBuild = readFileSync(join(__dirname, 'build.sql')).toString();
  const adminBuild = readFileSync(join(__dirname, 'admin.sql')).toString();
  const fakeData = readFileSync(join(__dirname, 'fakeData.sql')).toString();
  return connection.query(sqlBuild + adminBuild + fakeData);
};

module.exports = dbBuild;
