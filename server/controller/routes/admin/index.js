const { login } = require('./login');
const { logout } = require('./logout');
const { getUsersEvent } = require('./viewUsers');
const { getUsersData } = require('./getUsers');
const { validateEvent, createEvent } = require('./createEvent');

module.exports = {
  validateEvent, createEvent, getUsersEvent, getUsersData, login, logout,
};
