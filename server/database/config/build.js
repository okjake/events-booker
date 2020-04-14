const { readFileSync } = require('fs');
const { join } = require('path');

const connection = require('./connection');

const dbBuild = () => {
  const sqlBuild = readFileSync(join(__dirname, 'build.sql')).toString();
  return connection.query(sqlBuild);
};

module.exports = { dbBuild };
